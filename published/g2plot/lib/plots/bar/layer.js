"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var global_1 = require("../../base/global");
var view_layer_1 = tslib_1.__importDefault(require("../../base/view-layer"));
var factory_1 = require("../../components/factory");
var conversion_tag_1 = tslib_1.__importDefault(require("../../components/conversion-tag"));
var factory_2 = require("../../geoms/factory");
var scale_1 = require("../../util/scale");
var apply_responsive_1 = tslib_1.__importDefault(require("./apply-responsive"));
require("./theme");
require("./component/label");
require("./component/label-auto");
var EventParser = tslib_1.__importStar(require("./event"));
var view_1 = require("../../util/view");
var G2_GEOM_MAP = {
    bar: 'interval',
};
var PLOT_GEOM_MAP = {
    interval: 'bar',
};
var BaseBarLayer = /** @class */ (function (_super) {
    tslib_1.__extends(BaseBarLayer, _super);
    function BaseBarLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'bar';
        return _this;
    }
    BaseBarLayer.getDefaultOptions = function () {
        var cfg = {
            xAxis: {
                visible: true,
                line: {
                    visible: false,
                },
                title: {
                    visible: true,
                },
                label: {
                    visible: false,
                },
                tickLine: {
                    visible: false,
                },
                grid: {
                    visible: false,
                },
                nice: true,
            },
            yAxis: {
                visible: true,
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
                    autoRotate: false,
                    autoHide: true,
                },
                title: {
                    visible: false,
                    offset: 12,
                },
            },
            tooltip: {
                visible: true,
                shared: true,
                showCrosshairs: false,
                showMarkers: false,
            },
            label: {
                visible: true,
                position: 'left',
                adjustColor: true,
            },
            legend: {
                visible: false,
                position: 'top-left',
            },
            interactions: [
                { type: 'tooltip' },
                { type: 'active-region' },
                { type: 'legend-active' },
                { type: 'legend-filter' },
            ],
            conversionTag: {
                visible: false,
            },
        };
        return util_1.deepMix({}, _super.getDefaultOptions.call(this), cfg);
    };
    BaseBarLayer.prototype.beforeInit = function () {
        _super.prototype.beforeInit.call(this);
        var props = this.options;
        /** 响应式图形 */
        if (props.responsive && props.padding !== 'auto') {
            this.applyResponsive('preRender');
        }
    };
    BaseBarLayer.prototype.afterRender = function () {
        var props = this.options;
        this.renderLabel();
        /** 响应式 */
        if (props.responsive && props.padding !== 'auto') {
            this.applyResponsive('afterRender');
        }
        if (props.conversionTag.visible) {
            this.conversionTag = new conversion_tag_1.default(tslib_1.__assign({ view: this.view, field: props.xField, animation: props.animation === false ? false : true }, props.conversionTag));
        }
        _super.prototype.afterRender.call(this);
    };
    BaseBarLayer.prototype.geometryParser = function (dim, type) {
        if (dim === 'g2') {
            return G2_GEOM_MAP[type];
        }
        return PLOT_GEOM_MAP[type];
    };
    BaseBarLayer.prototype.processData = function (originData) {
        var inputData = originData ? originData.slice().reverse() : originData;
        var yField = this.options.yField;
        var processedData = [];
        util_1.each(inputData, function (data) {
            var d = util_1.clone(data);
            d[yField] = d[yField].toString();
            processedData.push(d);
        });
        return processedData;
    };
    BaseBarLayer.prototype.scale = function () {
        var props = this.options;
        var scales = {};
        /** 配置x-scale */
        scales[props.yField] = {
            type: 'cat',
        };
        if (util_1.has(props, 'yAxis')) {
            scale_1.extractScale(scales[props.yField], props.yAxis);
        }
        /** 配置y-scale */
        scales[props.xField] = {};
        if (util_1.has(props, 'xAxis')) {
            scale_1.extractScale(scales[props.xField], props.xAxis);
        }
        this.setConfig('scales', scales);
        _super.prototype.scale.call(this);
    };
    BaseBarLayer.prototype.coord = function () {
        this.setConfig('coordinate', {
            actions: [['transpose']],
        });
    };
    BaseBarLayer.prototype.axis = function () {
        var xAxis_parser = factory_1.getComponent('axis', {
            plot: this,
            dim: 'x',
        });
        var yAxis_parser = factory_1.getComponent('axis', {
            plot: this,
            dim: 'y',
        });
        /** 转置坐标系特殊配置 */
        if (xAxis_parser) {
            xAxis_parser.position = 'left';
        }
        if (yAxis_parser) {
            yAxis_parser.position = 'bottom';
        }
        var axesConfig = {};
        axesConfig[this.options.xField] = xAxis_parser;
        axesConfig[this.options.yField] = yAxis_parser;
        /** 存储坐标轴配置项到config */
        this.setConfig('axes', axesConfig);
    };
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    BaseBarLayer.prototype.adjustBar = function (bar) {
        return null;
    };
    BaseBarLayer.prototype.addGeometry = function () {
        var props = this.options;
        var bar = factory_2.getGeom('interval', 'main', {
            positionFields: [props.yField, props.xField],
            plot: this,
        });
        if (props.conversionTag.visible) {
            this.setConfig('theme', util_1.deepMix({}, this.getTheme(), {
                columnWidthRatio: 1 / 3,
            }));
        }
        this.adjustBar(bar);
        this.bar = bar;
        if (props.tooltip && (props.tooltip.fields || props.tooltip.formatter)) {
            this.geometryTooltip();
        }
        this.setConfig('geometry', bar);
    };
    BaseBarLayer.prototype.animation = function () {
        _super.prototype.animation.call(this);
        var props = this.options;
        if (props.animation === false) {
            /** 关闭动画 */
            this.bar.animate = false;
        }
    };
    BaseBarLayer.prototype.parseEvents = function () {
        _super.prototype.parseEvents.call(this, EventParser);
    };
    BaseBarLayer.prototype.renderLabel = function () {
        var scales = this.config.scales;
        var _a = this.options, label = _a.label, xField = _a.xField;
        var scale = scales[xField];
        if (label === null || label === void 0 ? void 0 : label.visible) {
            var geometry = view_1.getGeometryByType(this.view, 'interval');
            this.doRenderLabel(geometry, tslib_1.__assign({ type: 'bar', formatter: scale.formatter && (function (value) { return scale.formatter(value); }) }, this.options.label));
        }
    };
    BaseBarLayer.prototype.geometryTooltip = function () {
        this.bar.tooltip = {};
        var tooltipOptions = this.options.tooltip;
        if (tooltipOptions.fields) {
            this.bar.tooltip.fields = tooltipOptions.fields;
        }
        if (tooltipOptions.formatter) {
            this.bar.tooltip.callback = tooltipOptions.formatter;
            if (!tooltipOptions.fields) {
                this.bar.tooltip.fields = [this.options.xField, this.options.yField];
                if (this.options.colorField) {
                    this.bar.tooltip.fields.push(this.options.colorField);
                }
            }
        }
    };
    BaseBarLayer.prototype.applyResponsive = function (stage) {
        var _this = this;
        var methods = apply_responsive_1.default[stage];
        util_1.each(methods, function (r) {
            var responsive = r;
            responsive.method(_this);
        });
    };
    BaseBarLayer.prototype.getLabelOptionsByPosition = function (position) {
        if (position === 'middle') {
            return {
                offset: 0,
            };
        }
        if (position === 'left') {
            return {
                offset: 7,
                style: {
                    stroke: null,
                    lineWidth: 0,
                },
            };
        }
        if (position === 'right') {
            return {
                offset: 4,
            };
        }
    };
    return BaseBarLayer;
}(view_layer_1.default));
exports.default = BaseBarLayer;
global_1.registerPlotType('bar', BaseBarLayer);
//# sourceMappingURL=layer.js.map