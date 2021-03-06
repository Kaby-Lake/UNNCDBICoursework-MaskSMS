"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var global_1 = require("../../base/global");
var connected_area_1 = tslib_1.__importDefault(require("../../components/connected-area"));
var layer_1 = tslib_1.__importDefault(require("../column/layer"));
require("./theme");
require("./component/label");
require("./component/label-auto");
var view_1 = require("../../util/view");
var StackedColumnLayer = /** @class */ (function (_super) {
    tslib_1.__extends(StackedColumnLayer, _super);
    function StackedColumnLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'stackedColumn';
        return _this;
    }
    StackedColumnLayer.getDefaultOptions = function () {
        return util_1.deepMix({}, _super.getDefaultOptions.call(this), {
            legend: {
                visible: true,
                position: 'right-top',
            },
            label: {
                visible: false,
                position: 'middle',
                offset: 0,
                adjustColor: true,
            },
            connectedArea: {
                visible: false,
                triggerOn: 'mouseenter',
            },
        });
    };
    StackedColumnLayer.prototype.init = function () {
        if (this.options.connectedArea.visible) {
            this.options.tooltip.crosshairs = null;
        }
        _super.prototype.init.call(this);
    };
    StackedColumnLayer.prototype.afterRender = function () {
        var props = this.options;
        // 绘制区域连接组件
        if (props.connectedArea.visible) {
            this.connectedArea = new connected_area_1.default(tslib_1.__assign({ view: this.view, field: props.stackField, animation: props.animation === false ? false : true }, props.connectedArea));
        }
        _super.prototype.afterRender.call(this);
    };
    StackedColumnLayer.prototype.adjustColumn = function (column) {
        column.adjust = [
            {
                type: 'stack',
            },
        ];
    };
    StackedColumnLayer.prototype.renderLabel = function () {
        var scales = this.config.scales;
        var _a = this.options, label = _a.label, yField = _a.yField;
        var scale = scales[yField];
        if (label && label.visible) {
            var geometry = view_1.getGeometryByType(this.view, 'interval');
            this.doRenderLabel(geometry, tslib_1.__assign({ type: 'stacked-column', formatter: scale.formatter && (function (value) { return scale.formatter(value); }) }, this.options.label));
        }
    };
    StackedColumnLayer.prototype.geometryTooltip = function () {
        this.column.tooltip = {};
        var tooltipOptions = this.options.tooltip;
        if (tooltipOptions.fields) {
            this.column.tooltip.fields = tooltipOptions.fields;
        }
        if (tooltipOptions.formatter) {
            this.column.tooltip.callback = tooltipOptions.formatter;
            if (!tooltipOptions.fields) {
                this.column.tooltip.fields = [this.options.xField, this.options.yField, this.options.stackField];
            }
        }
    };
    return StackedColumnLayer;
}(layer_1.default));
exports.default = StackedColumnLayer;
global_1.registerPlotType('stackedColumn', StackedColumnLayer);
//# sourceMappingURL=layer.js.map