"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var global_1 = require("../../base/global");
var layer_1 = tslib_1.__importDefault(require("../bar/layer"));
require("./theme");
require("./component/label");
require("./component/label-auto");
var view_1 = require("../../util/view");
var StackedBarLayer = /** @class */ (function (_super) {
    tslib_1.__extends(StackedBarLayer, _super);
    function StackedBarLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'stackedBar';
        return _this;
    }
    StackedBarLayer.getDefaultOptions = function () {
        return util_1.deepMix({}, _super.getDefaultOptions.call(this), {
            xAxis: {
                visible: true,
                autoRotateTitle: false,
                grid: {
                    visible: true,
                },
                line: {
                    visible: false,
                },
                tickLine: {
                    visible: true,
                },
                label: {
                    visible: true,
                    autoRotate: true,
                    autoHide: true,
                },
                title: {
                    visible: true,
                    offset: 12,
                },
            },
            yAxis: {
                visible: true,
                autoRotateTitle: true,
                grid: {
                    visible: false,
                },
                line: {
                    visible: false,
                },
                tickLine: {
                    visible: false,
                },
                label: {
                    visible: true,
                    autoRotate: true,
                    autoHide: true,
                },
                title: {
                    visible: false,
                    offset: 12,
                },
            },
            legend: {
                visible: true,
                position: 'top-left',
                offsetY: 0,
            },
        });
    };
    StackedBarLayer.prototype.adjustBar = function (bar) {
        bar.adjust = [
            {
                type: 'stack',
            },
        ];
    };
    StackedBarLayer.prototype.renderLabel = function () {
        var scales = this.config.scales;
        var _a = this.options, label = _a.label, xField = _a.xField;
        var scale = scales[xField];
        if (label === null || label === void 0 ? void 0 : label.visible) {
            var geometry = view_1.getGeometryByType(this.view, 'interval');
            this.doRenderLabel(geometry, tslib_1.__assign({ type: 'stacked-bar', formatter: scale.formatter && (function (value) { return scale.formatter(value); }) }, this.options.label));
        }
    };
    StackedBarLayer.prototype.geometryTooltip = function () {
        this.bar.tooltip = {};
        var tooltipOptions = this.options.tooltip;
        if (tooltipOptions.fields) {
            this.bar.tooltip.fields = tooltipOptions.fields;
        }
        if (tooltipOptions.formatter) {
            this.bar.tooltip.callback = tooltipOptions.formatter;
            if (!tooltipOptions.fields) {
                this.bar.tooltip.fields = [this.options.xField, this.options.yField, this.options.stackField];
            }
        }
    };
    return StackedBarLayer;
}(layer_1.default));
exports.default = StackedBarLayer;
global_1.registerPlotType('stackedBar', StackedBarLayer);
//# sourceMappingURL=layer.js.map