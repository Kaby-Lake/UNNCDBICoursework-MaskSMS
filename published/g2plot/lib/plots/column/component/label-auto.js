"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var base_1 = require("../../../components/label/base");
var dependents_1 = require("../../../dependents");
var label_1 = tslib_1.__importDefault(require("./label"));
var view_1 = require("../../../util/view");
var bbox_1 = tslib_1.__importDefault(require("../../../util/bbox"));
var color_1 = require("../../../util/color");
/** 自动模式的 Column 数据标签，会根据图形和数据标签自动优化数据标签布局和样式等 */
var ColumnAutoLabel = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnAutoLabel, _super);
    function ColumnAutoLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnAutoLabel.prototype.getPosition = function (element) {
        var offset = this.getDefaultOffset();
        var value = this.getValue(element);
        var bbox = this.getElementShapeBBox(element);
        var minX = bbox.minX, minY = bbox.minY, maxY = bbox.maxY, width = bbox.width;
        var _a = this.options, offsetX = _a.offsetX, offsetY = _a.offsetY;
        var x = minX + width / 2 + offsetX;
        var dir = value > 0 ? -1 : 1;
        var root = value > 0 ? minY : maxY;
        var y = root + offset * dir + offsetY;
        // 默认全部先设置为 top
        return { x: x, y: y };
    };
    /** 默认的 fill 取自用户配置或主题配置 */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ColumnAutoLabel.prototype.getTextFill = function (element) {
        var style = this.options.style;
        return style.fill;
    };
    /** 默认不描边 */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ColumnAutoLabel.prototype.getTextStroke = function (element) {
        return undefined;
    };
    /** 默认无处理：在 layout 阶段处理 */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ColumnAutoLabel.prototype.adjustLabel = function (label, element) {
        // empty
    };
    /** 自动布局所有的数据标签 */
    ColumnAutoLabel.prototype.layoutLabels = function (geometry, labels) {
        if (this.shouldInShapeLabels(labels)) {
            this.inShapeLabels(geometry, labels);
        }
        this.autoHideLabels(geometry, labels);
    };
    /** 判断是否可以把数据标签放置在柱子内部 */
    ColumnAutoLabel.prototype.shouldInShapeLabels = function (labels) {
        var _this = this;
        return util_1.every(labels, function (label) {
            var labelBBox = label.getBBox();
            var element = label.get('element');
            var bbox = _this.getElementShapeBBox(element);
            return bbox.width >= labelBBox.width;
        });
    };
    /** 内置数据标签，并自动设置颜色描边等属性 */
    ColumnAutoLabel.prototype.inShapeLabels = function (geometry, labels) {
        var coordinateBBox = this.getCoordinateBBox();
        var xField = geometry.getXYFields()[0];
        var _a = this.options, darkStyle = _a.darkStyle, lightStyle = _a.lightStyle;
        var groupedLabels = util_1.groupBy(labels, function (label) { return label.get(dependents_1.ORIGIN)[dependents_1.FIELD_ORIGIN][xField]; });
        util_1.each(labels, function (label) {
            var curGroup = groupedLabels[label.get(dependents_1.ORIGIN)[dependents_1.FIELD_ORIGIN][xField]] || [];
            var element = label.get('element');
            var shape = element.shape;
            var fillWhite = color_1.isContrastColorWhite(shape.attr('fill'));
            var shapeBBox = bbox_1.default.fromBBoxObject(shape.getBBox());
            var labelBBox = bbox_1.default.fromBBoxObject(label.getBBox());
            // 如果 Column 本身就不可见，直接隐藏对应的 label
            if (view_1.getOverlapArea(coordinateBBox, shapeBBox) <= 0) {
                label.set('visible', false);
            }
            if (labelBBox.height > shapeBBox.height) {
                // 处理放不下的情况
                var idx = util_1.findIndex(curGroup, function (item) { return item === label; });
                if (idx !== 0) {
                    label.set('visible', false);
                }
            }
            else {
                // 数据标签展示在图形中央
                label.attr({
                    y: shapeBBox.y + shapeBBox.height / 2,
                    textBaseline: 'middle',
                });
                var overflow = labelBBox.width > shapeBBox.width || labelBBox.height > shapeBBox.height;
                if (overflow) {
                    // 出现了溢出情况，添加描边
                    label.attr({
                        stroke: lightStyle === null || lightStyle === void 0 ? void 0 : lightStyle.stroke,
                    });
                }
                else {
                    // 放置在柱形内部，颜色取反
                    label.attr({
                        fill: fillWhite ? lightStyle === null || lightStyle === void 0 ? void 0 : lightStyle.fill : darkStyle === null || darkStyle === void 0 ? void 0 : darkStyle.fill,
                        fillOpacity: fillWhite ? lightStyle === null || lightStyle === void 0 ? void 0 : lightStyle.fillOpacity : darkStyle === null || darkStyle === void 0 ? void 0 : darkStyle.fillOpacity,
                        stroke: undefined,
                    });
                }
            }
        });
    };
    /** 数据标签防重叠抽样 */
    ColumnAutoLabel.prototype.autoHideLabels = function (geometry, labels) {
        var coordinateBBox = this.getCoordinateBBox();
        var filteredLabels = this.filterLabels(labels);
        var xField = geometry.getXYFields()[0];
        var dones = [];
        var todo = [];
        var groupedLabels = util_1.groupBy(filteredLabels, function (label) { return label.get(dependents_1.ORIGIN)[dependents_1.FIELD_ORIGIN][xField]; });
        var xValues = util_1.uniq(util_1.map(filteredLabels, function (label) { return label.get(dependents_1.ORIGIN)[dependents_1.FIELD_ORIGIN][xField]; }));
        var xValue;
        if (util_1.size(xValues) > 0) {
            // 第一组
            xValue = xValues.shift();
            util_1.each(groupedLabels[xValue], function (label) { return todo.push(label); });
        }
        if (util_1.size(xValues) > 0) {
            // 最后一组
            xValue = xValues.pop();
            util_1.each(groupedLabels[xValue], function (label) { return todo.push(label); });
        }
        util_1.each(xValues.reverse(), function (val) {
            // 其他组
            util_1.each(groupedLabels[val], function (label) { return todo.push(label); });
        });
        while (todo.length > 0) {
            var cur = todo.shift();
            if (cur.get('visible')) {
                view_1.moveInPanel(cur, coordinateBBox);
                if (view_1.checkShapeOverlap(cur, dones)) {
                    cur.set('visible', false);
                }
                else {
                    dones.push(cur);
                }
            }
        }
    };
    /** 抽样数据标签，设置最大数量的数据标签，其他的统一隐藏 */
    ColumnAutoLabel.prototype.filterLabels = function (labels) {
        var MAX_CNT = 500; // 最多显示 500 个数据标签
        var filteredLabels = [];
        var pages = Math.max(Math.floor(labels.length / MAX_CNT), 1);
        util_1.each(labels, function (label, idx) {
            if (idx % pages === 0) {
                filteredLabels.push(label);
            }
            else {
                label.set('visible', false);
            }
        });
        return filteredLabels;
    };
    return ColumnAutoLabel;
}(label_1.default));
exports.default = ColumnAutoLabel;
base_1.registerLabelComponent('column-auto', ColumnAutoLabel);
//# sourceMappingURL=label-auto.js.map