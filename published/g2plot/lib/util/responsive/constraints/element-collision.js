"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var MathUtil = tslib_1.__importStar(require("../../math"));
function elementCollision(a, b) {
    var polygonA = [a.topLeft, a.topRight, a.bottomRight, a.bottomLeft]; // 顶点顺时针
    var polygonB = [b.topLeft, b.topRight, b.bottomRight, b.bottomLeft];
    var dist = MathUtil.minDistBetweenConvexPolygon(polygonA, polygonB);
    return Math.round(dist) >= 2;
}
exports.default = {
    type: 'group',
    usage: 'compare',
    expression: elementCollision,
};
//# sourceMappingURL=element-collision.js.map