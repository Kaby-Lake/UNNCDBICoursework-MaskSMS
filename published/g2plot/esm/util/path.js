/**
 * @description path 计算、转换的辅助工具
 */
import * as matrixUtil from '@antv/matrix-util';
import { each } from '@antv/util';
var vector2 = matrixUtil.vec2;
function _points2path(points, isInCircle) {
    var path = [];
    if (points.length) {
        for (var i = 0, length_1 = points.length; i < length_1; i += 1) {
            var item = points[i];
            var command = i === 0 ? 'M' : 'L';
            path.push([command, item.x, item.y]);
        }
        if (isInCircle) {
            path.push(['Z']);
        }
    }
    return path;
}
function _getPointRadius(coord, point) {
    var center = coord.getCenter();
    var r = Math.sqrt(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2));
    return r;
}
function _convertArr(arr, coord) {
    var tmp = [arr[0]];
    for (var i = 1, len = arr.length; i < len; i = i + 2) {
        var point = coord.convertPoint({
            x: arr[i],
            y: arr[i + 1],
        });
        tmp.push(point.x, point.y);
    }
    return tmp;
}
function _convertPolarPath(pre, cur, coord) {
    var isTransposed = coord.isTransposed, startAngle = coord.startAngle, endAngle = coord.endAngle;
    var prePoint = {
        x: pre[1],
        y: pre[2],
    };
    var curPoint = {
        x: cur[1],
        y: cur[2],
    };
    var rst = [];
    var xDim = isTransposed ? 'y' : 'x';
    var angleRange = Math.abs(curPoint[xDim] - prePoint[xDim]) * (endAngle - startAngle);
    var direction = curPoint[xDim] >= prePoint[xDim] ? 1 : 0; // 圆弧的方向
    var flag = angleRange > Math.PI ? 1 : 0; // 大弧还是小弧标志位
    var convertPoint = coord.convertPoint(curPoint);
    var r = _getPointRadius(coord, convertPoint);
    if (r >= 0.5) {
        // 小于1像素的圆在图像上无法识别
        if (angleRange === Math.PI * 2) {
            var middlePoint = {
                x: (curPoint.x + prePoint.x) / 2,
                y: (curPoint.y + prePoint.y) / 2,
            };
            var middleConvertPoint = coord.convertPoint(middlePoint);
            rst.push(['A', r, r, 0, flag, direction, middleConvertPoint.x, middleConvertPoint.y]);
            rst.push(['A', r, r, 0, flag, direction, convertPoint.x, convertPoint.y]);
        }
        else {
            rst.push(['A', r, r, 0, flag, direction, convertPoint.x, convertPoint.y]);
        }
    }
    return rst;
}
// 当存在整体的圆时，去除圆前面和后面的线，防止出现直线穿过整个圆的情形
function _filterFullCirleLine(path) {
    each(path, function (subPath, index) {
        var cur = subPath;
        if (cur[0].toLowerCase() === 'a') {
            var pre = path[index - 1];
            var next = path[index + 1];
            if (next && next[0].toLowerCase() === 'a') {
                if (pre && pre[0].toLowerCase() === 'l') {
                    pre[0] = 'M';
                }
            }
            else if (pre && pre[0].toLowerCase() === 'a') {
                if (next && next[0].toLowerCase() === 'l') {
                    next[0] = 'M';
                }
            }
        }
    });
}
export var smoothBezier = function (points, smooth, isLoop, constraint) {
    var cps = [];
    var prevPoint;
    var nextPoint;
    var hasConstraint = !!constraint;
    var min;
    var max;
    if (hasConstraint) {
        min = [Infinity, Infinity];
        max = [-Infinity, -Infinity];
        for (var i = 0, l = points.length; i < l; i++) {
            var point = points[i];
            min = vector2.min([], min, point);
            max = vector2.max([], max, point);
        }
        min = vector2.min([], min, constraint[0]);
        max = vector2.max([], max, constraint[1]);
    }
    for (var i = 0, len = points.length; i < len; i++) {
        var point = points[i];
        if (isLoop) {
            prevPoint = points[i ? i - 1 : len - 1];
            nextPoint = points[(i + 1) % len];
        }
        else {
            if (i === 0 || i === len - 1) {
                cps.push(point);
                continue;
            }
            else {
                prevPoint = points[i - 1];
                nextPoint = points[i + 1];
            }
        }
        var v = [];
        v = vector2.sub(v, nextPoint, prevPoint);
        v = vector2.scale(v, v, smooth);
        var d0 = vector2.distance(point, prevPoint);
        var d1 = vector2.distance(point, nextPoint);
        var sum = d0 + d1;
        if (sum !== 0) {
            d0 /= sum;
            d1 /= sum;
        }
        var v1 = vector2.scale([], v, -d0);
        var v2 = vector2.scale([], v, d1);
        var cp0 = vector2.add([], point, v1);
        var cp1 = vector2.add([], point, v2);
        if (hasConstraint) {
            cp0 = vector2.max([], cp0, min);
            cp0 = vector2.min([], cp0, max);
            cp1 = vector2.max([], cp1, min);
            cp1 = vector2.min([], cp1, max);
        }
        cps.push(cp0);
        cps.push(cp1);
    }
    if (isLoop) {
        cps.push(cps.shift());
    }
    return cps;
};
// 贝塞尔曲线
export function catmullRom2bezier(crp, z, constraint) {
    var isLoop = !!z;
    var pointList = [];
    for (var i = 0, l = crp.length; i < l; i += 2) {
        pointList.push([crp[i], crp[i + 1]]);
    }
    var controlPointList = smoothBezier(pointList, 0.4, isLoop, constraint);
    var len = pointList.length;
    var d1 = [];
    var cp1;
    var cp2;
    var p;
    for (var i = 0; i < len - 1; i++) {
        cp1 = controlPointList[i * 2];
        cp2 = controlPointList[i * 2 + 1];
        p = pointList[i + 1];
        d1.push(['C', cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]]);
    }
    if (isLoop) {
        cp1 = controlPointList[len];
        cp2 = controlPointList[len + 1];
        p = pointList[0];
        d1.push(['C', cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]]);
    }
    return d1;
}
// 将点连接成路径 path
export function getLinePath(points, isInCircle) {
    return _points2path(points, isInCircle);
}
// get spline： 限定了范围的平滑线
export function getSplinePath(points, isInCircle, constaint) {
    var data = [];
    var first = points[0];
    var prePoint = null;
    if (points.length <= 2) {
        // 两点以内直接绘制成路径
        return getLinePath(points, isInCircle);
    }
    each(points, function (point) {
        if (!prePoint || !(prePoint.x === point.x && prePoint.y === point.y)) {
            data.push(point.x);
            data.push(point.y);
            prePoint = point;
        }
    });
    var constraint = constaint || [
        // 范围
        [0, 0],
        [1, 1],
    ];
    var splinePath = catmullRom2bezier(data, isInCircle, constraint);
    splinePath.unshift(['M', first.x, first.y]);
    return splinePath;
}
// 获取点到圆心的距离
export function getPointRadius(coord, point) {
    return _getPointRadius(coord, point);
}
// 获取点到圆心的夹角
export function getPointAngle(coord, point) {
    var center = coord.getCenter();
    return Math.atan2(point.y - center.y, point.x - center.x);
}
export function convertNormalPath(coord, path) {
    var tmp = [];
    each(path, function (subPath) {
        var action = subPath[0];
        switch (action.toLowerCase()) {
            case 'm':
            case 'l':
            case 'c':
                tmp.push(_convertArr(subPath, coord));
                break;
            case 'z':
            default:
                tmp.push(subPath);
                break;
        }
    });
    return tmp;
}
export function convertPolarPath(coord, path) {
    var tmp = [];
    var pre;
    var cur;
    var transposed;
    var equals;
    each(path, function (subPath, index) {
        var action = subPath[0];
        switch (action.toLowerCase()) {
            case 'm':
            case 'c':
            case 'q':
                tmp.push(_convertArr(subPath, coord));
                break;
            case 'l':
                pre = path[index - 1];
                cur = subPath;
                transposed = coord.isTransposed;
                // 是否半径相同，转换成圆弧
                equals = transposed ? pre[pre.length - 2] === cur[1] : pre[pre.length - 1] === cur[2];
                if (equals) {
                    tmp = tmp.concat(_convertPolarPath(pre, cur, coord));
                }
                else {
                    // y 不相等，所以直接转换
                    tmp.push(_convertArr(subPath, coord));
                }
                break;
            case 'z':
            default:
                tmp.push(subPath);
                break;
        }
    });
    _filterFullCirleLine(tmp); // 过滤多余的直线
    return tmp;
}
//# sourceMappingURL=path.js.map