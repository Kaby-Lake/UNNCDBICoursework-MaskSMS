"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("@antv/util");
function dice(root, x0, y0, x1, y1) {
    var width = x1 - x0;
    var children = root.children, value = root.value;
    children.sort(function (a, b) {
        return b.value - a.value;
    });
    var k = width / value;
    var node_x = x0;
    util_1.each(children, function (c) {
        c.y0 = y0;
        c.y1 = y1;
        c.x0 = node_x;
        node_x += c.value * k;
        c.x1 = c.x0 + c.value * k;
    });
}
exports.dice = dice;
//# sourceMappingURL=dice.js.map