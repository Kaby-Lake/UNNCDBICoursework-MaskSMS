"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("@antv/util");
function rgb2arr(str) {
    var colorStr = str.indexOf('#') === 0 ? str.substr(1) : str;
    var arr = [];
    arr.push(parseInt(colorStr.substr(0, 2), 16));
    arr.push(parseInt(colorStr.substr(2, 2), 16));
    arr.push(parseInt(colorStr.substr(4, 2), 16));
    return arr;
}
exports.rgb2arr = rgb2arr;
function toHex(value) {
    var v;
    v = Math.round(value);
    v = v.toString(16);
    if (v.length === 1) {
        v = "0" + value;
    }
    return v;
}
exports.toHex = toHex;
function arr2rgb(arr) {
    return "#" + (toHex(arr[0]) + toHex(arr[1]) + toHex(arr[2]));
}
exports.arr2rgb = arr2rgb;
function mappingColor(band, gray) {
    var reflect;
    util_1.each(band, function (b) {
        var map = b;
        if (gray >= map.from && gray < map.to) {
            reflect = map.color;
        }
    });
    return reflect;
}
exports.mappingColor = mappingColor;
// 根据YIQ亮度判断指定颜色取反色是不是白色
// http://24ways.org/2010/calculating-color-contrast
exports.isContrastColorWhite = function (rgb) {
    var _a = rgb2arr(rgb), r = _a[0], g = _a[1], b = _a[2];
    var isDark = (r * 299 + g * 587 + b * 114) / 1000 < 128;
    return isDark;
};
//# sourceMappingURL=color.js.map