"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var bbox_1 = tslib_1.__importDefault(require("../../util/bbox"));
var common_1 = require("../../util/common");
/**
 * 处理图表padding的逻辑：
 * 注册参与padding的自定义组件
 */
var PaddingController = /** @class */ (function () {
    function PaddingController(cfg) {
        this.innerPaddingComponents = [];
        this.outerPaddingComponents = [];
        this.plot = cfg.plot;
    }
    PaddingController.prototype.registerPadding = function (component, type, checkIfExist) {
        if (type === void 0) { type = 'outer'; }
        if (checkIfExist === void 0) { checkIfExist = false; }
        if (type === 'inner') {
            if (checkIfExist) {
                if (!this.innerPaddingComponents.find(function (c) { return c == component; })) {
                    this.innerPaddingComponents.push(component);
                }
            }
            else {
                this.innerPaddingComponents.push(component);
            }
        }
        else {
            if (checkIfExist) {
                if (!this.outerPaddingComponents.find(function (c) { return c == component; })) {
                    this.outerPaddingComponents.push(component);
                }
            }
            else {
                this.outerPaddingComponents.push(component);
            }
        }
    };
    /**
     * 清除已经注册的元素
     */
    PaddingController.prototype.clear = function () {
        this.innerPaddingComponents = [];
        // 一些组件是在view渲染完成之后渲染初始化的
        // TODO: afterRender的什么时候清除
        this.outerPaddingComponents = util_1.filter(this.outerPaddingComponents, function (component) { return component.afterRender; });
    };
    PaddingController.prototype.clearOuterComponents = function () {
        util_1.each(this.outerPaddingComponents, function (component) {
            if (component.afterRender) {
                component.destroy();
            }
        });
        this.outerPaddingComponents = [];
    };
    PaddingController.prototype.getPadding = function () {
        var props = this.plot.options;
        var padding = props.padding ? props.padding : this.plot.config.theme.padding;
        if (padding === 'auto') {
            return [0, 0, 0, 1];
        }
        return padding;
    };
    /** view层的padding计算 */
    PaddingController.prototype.processAutoPadding = function () {
        var padding = this._getInnerAutoPadding();
        this.plot.updateConfig({
            padding: padding,
        });
        this.plot.render();
    };
    PaddingController.prototype.processOuterPadding = function () {
        if (!this.plot.layerBBox) {
            this.plot.layerBBox = new bbox_1.default(this.plot.x, this.plot.y, this.plot.width, this.plot.height);
        }
        var viewMinX = this.plot.layerBBox.minX;
        var viewMaxX = this.plot.layerBBox.maxX;
        var viewMinY = this.plot.layerBBox.minY;
        var viewMaxY = this.plot.layerBBox.maxY;
        util_1.each(this.outerPaddingComponents, function (component) {
            var position = component.position;
            var _a = component.getBBox(), minX = _a.minX, maxX = _a.maxX, minY = _a.minY, maxY = _a.maxY;
            if (maxY >= viewMinY && maxY <= viewMaxY && position === 'top') {
                viewMinY = maxY;
            }
            if (minY >= viewMinY && minY <= viewMaxY && position === 'bottom') {
                viewMaxY = minY;
            }
            if (maxX > viewMinX && maxX <= viewMaxX && position === 'left') {
                viewMinX = maxX;
            }
            if (minX >= viewMinX && maxX <= viewMaxX && position === 'right') {
                viewMaxX = minX;
            }
        });
        return new bbox_1.default(viewMinX, viewMinY, viewMaxX - viewMinX, viewMaxY - viewMinY);
    };
    PaddingController.prototype._getInnerAutoPadding = function () {
        var props = this.plot.options;
        var view = this.plot.view;
        var viewRange = util_1.clone(view.coordinateBBox);
        var maxX = viewRange.maxX, maxY = viewRange.maxY, minY = viewRange.minY, minX = viewRange.minX;
        var bleeding = this.plot.config.theme.bleeding;
        if (util_1.isArray(bleeding)) {
            util_1.each(bleeding, function (it, index) {
                if (typeof bleeding[index] === 'function') {
                    bleeding[index] = bleeding[index](props);
                }
            });
        }
        this.plot.config.theme.legend.margin = bleeding;
        this.bleeding = util_1.clone(bleeding);
        // 参与auto padding的components: axis legend label annotation
        var components_bbox = [new bbox_1.default(viewRange.minX, viewRange.minY, viewRange.width, viewRange.height)];
        this._getAxis(view, components_bbox[0], components_bbox);
        var box = this._mergeBBox(components_bbox);
        this._getLegend(view, box, components_bbox);
        box = this._mergeBBox(components_bbox);
        // 参与auto padding的自定义组件
        var components = this.innerPaddingComponents;
        util_1.each(components, function (obj) {
            var component = obj;
            var bbox = component.getBBox();
            components_bbox.push(bbox);
        });
        box = this._mergeBBox(components_bbox);
        var padding = [
            minY - box.minY + this.bleeding[0],
            box.maxX - maxX + this.bleeding[1],
            box.maxY - maxY + this.bleeding[2],
            minX - box.minX + this.bleeding[3],
        ];
        // label、annotation等
        var panelPadding = this._getPanel(view);
        padding[0] += panelPadding[0];
        padding[1] += panelPadding[1];
        padding[2] += panelPadding[2];
        padding[3] += panelPadding[3];
        return padding;
    };
    PaddingController.prototype._getAxis = function (view, globalBBox, bboxes) {
        var axes = common_1.getAxisComponents(view);
        var isTransposed = view.getCoordinate().isTransposed;
        util_1.each(axes, function (axis) {
            if (axis.get('group').get('children').length === 0) {
                return;
            }
            var position = axis.get('position');
            var _a = axis.getLayoutBBox(), minX = _a.minX, minY = _a.minY, width = _a.width, height = _a.height;
            if (!isTransposed) {
                if (position === 'left') {
                    bboxes.push(new bbox_1.default(globalBBox.minX - width, minY, width, height));
                }
                else if (position === 'bottom') {
                    bboxes.push(new bbox_1.default(minX, globalBBox.maxY + height, width, height));
                }
                else if (position === 'right') {
                    bboxes.push(new bbox_1.default(globalBBox.maxX, minY, width, height));
                }
            }
            else {
                if (position === 'bottom') {
                    bboxes.push(new bbox_1.default(globalBBox.minX - width, minY, width, height));
                }
                else if (position === 'left') {
                    bboxes.push(new bbox_1.default(minX, globalBBox.maxY + height, width, height));
                }
                else if (position === 'top') {
                    bboxes.push(new bbox_1.default(globalBBox.maxX, minY, width, height));
                }
            }
        });
    };
    PaddingController.prototype._getLegend = function (view, globalBBox, bboxes) {
        var legends = common_1.getLegendComponents(view);
        util_1.each(legends, function (legend) {
            var position = legend.get('position').split('-')[0];
            var _a = legend.getLayoutBBox(), minX = _a.minX, minY = _a.minY, width = _a.width, height = _a.height;
            if (position === 'top') {
                bboxes.push(new bbox_1.default(minX, globalBBox.minY - height, width, height));
            }
            else if (position === 'bottom') {
                bboxes.push(new bbox_1.default(minX, globalBBox.maxY, width, height));
            }
            else if (position === 'left') {
                bboxes.push(new bbox_1.default(globalBBox.minX - width, minY, width, height));
            }
            else {
                bboxes.push(new bbox_1.default(globalBBox.maxX, minY, width, height));
            }
        });
    };
    PaddingController.prototype._getPanel = function (view) {
        var groups = [];
        var geoms = view.geometries;
        util_1.each(geoms, function (geom) {
            if (geom.labelsContainer) {
                groups.push(geom.labelsContainer);
            }
        });
        var minX = Infinity;
        var maxX = -Infinity;
        var minY = Infinity;
        var maxY = -Infinity;
        util_1.each(groups, function (group) {
            var children = group.get('children');
            children.forEach(function (child) {
                if (child.type === 'group' && child.get('children').length === 0) {
                    return;
                }
                var bbox = child.getBBox();
                if (bbox.minX < minX) {
                    minX = bbox.minX;
                }
                if (bbox.maxX > maxX) {
                    maxX = bbox.maxX;
                }
                if (bbox.minY < minY) {
                    minY = bbox.minY;
                }
                if (bbox.maxY > maxY) {
                    maxY = bbox.maxY;
                }
            });
        });
        var panelRange = view.coordinateBBox;
        //right
        var rightDist = Math.max(maxX - parseFloat(panelRange.maxX), 0);
        if (rightDist > 0) {
            var ratio = panelRange.width / (panelRange.width + rightDist);
            rightDist *= ratio;
        }
        //left
        var leftDist = Math.max(parseFloat(panelRange.minX) - minX, 0);
        if (leftDist > 0) {
            var ratio = panelRange.width / (panelRange.width + leftDist);
            leftDist *= ratio;
        }
        //top
        var topDist = Math.max(parseFloat(panelRange.minY) - minY, 0);
        if (topDist > 0) {
            var ratio = panelRange.height / (panelRange.height + topDist);
            topDist *= ratio;
        }
        //bottom
        var bottomDist = Math.max(maxY - parseFloat(panelRange.maxY), 0);
        if (bottomDist > 0) {
            var ratio = panelRange.height / (panelRange.height + bottomDist);
            bottomDist *= ratio;
        }
        return [topDist, rightDist, bottomDist, leftDist];
    };
    PaddingController.prototype._mergeBBox = function (bboxes) {
        var minX = Infinity;
        var maxX = -Infinity;
        var minY = Infinity;
        var maxY = -Infinity;
        util_1.each(bboxes, function (bbox) {
            var box = bbox;
            minX = Math.min(box.minX, minX);
            maxX = Math.max(box.maxX, maxX);
            minY = Math.min(box.minY, minY);
            maxY = Math.max(box.maxY, maxY);
        });
        return { minX: minX, maxX: maxX, minY: minY, maxY: maxY };
    };
    return PaddingController;
}());
exports.default = PaddingController;
//# sourceMappingURL=padding.js.map