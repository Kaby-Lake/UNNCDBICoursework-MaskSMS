"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dependents_1 = require("../dependents");
/**
 * 判断text是否可用, title description
 *
 * @param source
 */
function isTextUsable(source) {
    if (!source)
        return false;
    if (source.visible === true && typeof source.text === 'string' && source.text.trim())
        return true;
    return false;
}
exports.isTextUsable = isTextUsable;
/**
 * 为字符串添加换行符
 * @param source - 字符串数组 ['a', 'b', 'c']
 * @param breaks - 要添加换行的index
 *
 * @example
 * ```js
 * breakText(['a','b','c'], [1])
 *
 * // a\nbc
 * ```
 */
function breakText(source, breaks) {
    var result = tslib_1.__spreadArrays(source);
    breaks.forEach(function (pos, index) {
        result.splice(pos + index, 0, '\n');
    });
    return result.join('');
}
exports.breakText = breakText;
/**
 * 获取 View 中所有的 Axis 组件
 */
function getAxisComponents(view) {
    return view
        .getComponents()
        .filter(function (co) { return co.type === dependents_1.COMPONENT_TYPE.AXIS; })
        .map(function (co) { return co.component; });
}
exports.getAxisComponents = getAxisComponents;
function getLegendComponents(view) {
    return view
        .getComponents()
        .filter(function (co) { return co.type === dependents_1.COMPONENT_TYPE.LEGEND; })
        .map(function (co) { return co.component; });
}
exports.getLegendComponents = getLegendComponents;
function getAxisShapes(view) {
    var axisShape = view.backgroundGroup.findAll(function (el) {
        if (el.get('name')) {
            var name_1 = el.get('name').split('-');
            return name_1[0] === 'axis';
        }
    });
    return axisShape;
}
exports.getAxisShapes = getAxisShapes;
function getLegendShapes(view) {
    var axisShape = view.foregroundGroup.findAll(function (el) {
        if (el.get('name')) {
            return el.get('name') === 'legend-item-group';
        }
    });
    return axisShape;
}
exports.getLegendShapes = getLegendShapes;
function sortedLastIndex(arr, val) {
    var i = arr.length;
    while (i > 0) {
        if (val >= arr[i - 1]) {
            break;
        }
        i -= 1;
    }
    return i;
}
exports.sortedLastIndex = sortedLastIndex;
//# sourceMappingURL=common.js.map