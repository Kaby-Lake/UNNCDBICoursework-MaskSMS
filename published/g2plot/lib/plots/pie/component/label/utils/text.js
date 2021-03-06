"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
/**
 * 计算文本在画布中的宽度
 */
exports.measureTextWidth = util_1.memoize(function (text, font) {
    if (font === void 0) { font = {}; }
    var fontSize = font.fontSize, fontFamily = font.fontFamily, fontWeight = font.fontWeight, fontStyle = font.fontStyle, fontVariant = font.fontVariant;
    ctx.font = [fontStyle, fontVariant, fontWeight, fontSize + "px", fontFamily].join(' ');
    return ctx.measureText(util_1.isString(text) ? text : '').width;
}, function (text, font) { return (font ? tslib_1.__spreadArrays([text], util_1.values(font)).join('') : text); });
/**
 * 获取文本的 ... 文本。
 * 算法（减少每次 measureText 的长度，measureText 的性能跟字符串时间相关）：
 * 1. 先通过 STEP 逐步计算，找到最后一个小于 maxWidth 的字符串
 * 2. 然后对最后这个字符串二分计算
 * @param text 需要计算的文本, 由于历史原因 除了支持string，还支持空值,number和数组等
 * @param maxWidth
 * @param font
 * TODO 后续更新省略算法
 */
exports.getEllipsisText = function (text, maxWidth, font) {
    var STEP = 16; // 每次 16，调参工程师
    var DOT_WIDTH = exports.measureTextWidth('...', font);
    var leftText;
    if (!util_1.isString(text)) {
        leftText = util_1.toString(text);
    }
    else {
        leftText = text;
    }
    var leftWidth = maxWidth;
    var r = []; // 最终的分段字符串
    var currentText;
    var currentWidth;
    if (exports.measureTextWidth(text, font) <= maxWidth) {
        return text;
    }
    // 首先通过 step 计算，找出最大的未超出长度的
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // 更新字符串
        currentText = leftText.substr(0, STEP);
        // 计算宽度
        currentWidth = exports.measureTextWidth(currentText, font);
        // 超出剩余宽度，则停止
        if (currentWidth + DOT_WIDTH > leftWidth) {
            if (currentWidth > leftWidth) {
                break;
            }
        }
        r.push(currentText);
        // 没有超出，则计算剩余宽度
        leftWidth -= currentWidth;
        leftText = leftText.substr(STEP);
        // 字符串整体没有超出
        if (!leftText) {
            return r.join('');
        }
    }
    // 最下的最后一个 STEP，使用 1 递增（用二分效果更高）
    //eslint-disable-next-line no-constant-condition
    while (true) {
        // 更新字符串
        currentText = leftText.substr(0, 1);
        // 计算宽度
        currentWidth = exports.measureTextWidth(currentText, font);
        // 超出剩余宽度，则停止
        if (currentWidth + DOT_WIDTH > leftWidth) {
            break;
        }
        r.push(currentText);
        // 没有超出，则计算剩余宽度
        leftWidth -= currentWidth;
        leftText = leftText.substr(1);
        if (!leftText) {
            return r.join('');
        }
    }
    return r.join('') + "...";
};
//# sourceMappingURL=text.js.map