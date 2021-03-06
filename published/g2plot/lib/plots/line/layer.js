"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var global_1 = require("../../base/global");
var view_layer_1 = tslib_1.__importDefault(require("../../base/view-layer"));
var factory_1 = require("../../geoms/factory");
var scale_1 = require("../../util/scale");
var clipIn_with_data_1 = require("./animation/clipIn-with-data");
var apply_responsive_1 = tslib_1.__importDefault(require("./apply-responsive"));
require("../../components/label/point");
require("../../components/label/point-auto");
var line_label_1 = tslib_1.__importDefault(require("./component/label/line-label"));
var EventParser = tslib_1.__importStar(require("./event"));
var marker_point_1 = tslib_1.__importDefault(require("../../components/marker-point"));
require("./theme");
require("./apply-responsive/theme");
var index_1 = require("./interaction/index");
var view_1 = require("../../util/view");
var GEOM_MAP = {
    line: 'line',
    point: 'point',
};
var LineLayer = /** @class */ (function (_super) {
    tslib_1.__extends(LineLayer, _super);
    function LineLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'line';
        _this.markerPoints = [];
        return _this;
    }
    LineLayer.getDefaultOptions = function () {
        return util_1.deepMix({}, _super.getDefaultOptions.call(this), {
            connectNulls: false,
            smooth: false,
            lineSize: 2,
            lineStyle: {
                lineJoin: 'round',
                lineCap: 'round',
            },
            point: {
                visible: false,
                size: 3,
                shape: 'circle',
                style: {
                    stroke: '#fff',
                },
            },
            label: {
                visible: false,
                type: 'point',
            },
            legend: {
                visible: true,
                position: 'top-left',
                wordSpacing: 4,
            },
            tooltip: {
                crosshairs: {
                    line: {
                        style: {
                            stroke: 'rgba(0,0,0,0.45)',
                        },
                    },
                },
            },
            markerPoints: [],
        });
    };
    LineLayer.prototype.afterRender = function () {
        var _this = this;
        var options = this.options;
        this.renderLabel();
        if (options.markerPoints) {
            // 清空
            util_1.each(this.markerPoints, function (markerPoint) { return markerPoint.destroy(); });
            this.markerPoints = [];
            options.markerPoints.forEach(function (markerPointOpt) {
                if (markerPointOpt.visible) {
                    var markerPoint = new marker_point_1.default(tslib_1.__assign(tslib_1.__assign({}, markerPointOpt), { view: _this.view }));
                    _this.markerPoints.push(markerPoint);
                }
            });
        }
        // 响应式
        if (options.responsive && options.padding !== 'auto') {
            this.applyResponsive('afterRender');
        }
        _super.prototype.afterRender.call(this);
    };
    LineLayer.prototype.geometryParser = function (dim, type) {
        return GEOM_MAP[type];
    };
    LineLayer.prototype.scale = function () {
        var props = this.options;
        var scales = {};
        /** 配置x-scale */
        scales[props.xField] = {};
        if (util_1.has(props, 'xAxis')) {
            scale_1.extractScale(scales[props.xField], props.xAxis);
        }
        /** 配置y-scale */
        scales[props.yField] = {};
        if (util_1.has(props, 'yAxis')) {
            scale_1.extractScale(scales[props.yField], props.yAxis);
        }
        this.setConfig('scales', scales);
        scale_1.trySetScaleMinToZero(scales[props.yField], util_1.map(props.data, function (item) { return item[props.yField]; }));
        _super.prototype.scale.call(this);
    };
    LineLayer.prototype.coord = function () {
        return;
    };
    LineLayer.prototype.tooltip = function () {
        // 如果有标注点，则不展示markers
        if (util_1.some(this.options.markerPoints, function (markerPointOpt) { return markerPointOpt.visible; })) {
            this.options.tooltip.showMarkers = false;
        }
        _super.prototype.tooltip.call(this);
    };
    LineLayer.prototype.addGeometry = function () {
        // 配置线
        this.addLine();
        // 配置数据点
        this.addPoint();
    };
    LineLayer.prototype.addLine = function () {
        var props = this.options;
        this.line = factory_1.getGeom('line', 'main', {
            plot: this,
        });
        if (props.tooltip && (props.tooltip.fields || props.tooltip.formatter)) {
            this.geometryTooltip();
        }
        this.setConfig('geometry', this.line);
    };
    LineLayer.prototype.addPoint = function () {
        var props = this.options;
        var defaultConfig = { visible: false };
        if (props.point) {
            props.point = util_1.deepMix(defaultConfig, props.point);
        }
        if (props.point && props.point.visible) {
            this.point = factory_1.getGeom('point', 'guide', {
                plot: this,
            });
            this.setConfig('geometry', this.point);
        }
    };
    LineLayer.prototype.renderLabel = function () {
        var scales = this.config.scales;
        var _a = this.options, label = _a.label, yField = _a.yField;
        var scale = scales[yField];
        if (label.visible) {
            var geometry = view_1.getGeometryByType(this.view, 'line');
            if (label.type === 'line') {
                // TODO: Line Label 迁移
                var label_1 = new line_label_1.default(tslib_1.__assign({ view: this.view, plot: this }, this.options.label));
                label_1.render();
            }
            else {
                this.doRenderLabel(geometry, tslib_1.__assign({ type: 'point', formatter: scale.formatter && (function (value) { return scale.formatter(value); }) }, this.options.label));
            }
        }
    };
    LineLayer.prototype.geometryTooltip = function () {
        this.line.tooltip = {};
        var tooltipOptions = this.options.tooltip;
        if (tooltipOptions.fields) {
            this.line.tooltip.fields = tooltipOptions.fields;
        }
        if (tooltipOptions.formatter) {
            this.line.tooltip.callback = tooltipOptions.formatter;
            if (!tooltipOptions.fields) {
                this.line.tooltip.fields = [this.options.xField, this.options.yField];
                if (this.options.seriesField) {
                    this.line.tooltip.fields.push(this.options.seriesField);
                }
            }
        }
    };
    LineLayer.prototype.animation = function () {
        _super.prototype.animation.call(this);
        var props = this.options;
        if (!props.animation) {
            // 关闭动画
            this.line.animate = false;
            if (this.point)
                this.point.animate = false;
        }
        else {
            clipIn_with_data_1.getPlotOption({
                options: this.options,
                view: this.view,
            });
            this.line.animate = props.animation;
        }
    };
    LineLayer.prototype.applyInteractions = function () {
        _super.prototype.applyInteractions.call(this);
        this.interactions.push(new index_1.LineActive({
            view: this.view,
        }));
        this.interactions.push(new index_1.LineSelect({
            view: this.view,
        }));
    };
    LineLayer.prototype.parseEvents = function () {
        _super.prototype.parseEvents.call(this, EventParser);
    };
    LineLayer.prototype.applyResponsive = function (stage) {
        var _this = this;
        var methods = apply_responsive_1.default[stage];
        util_1.each(methods, function (r) {
            var responsive = r;
            responsive.method(_this);
        });
    };
    LineLayer.prototype.singleLineLabelCheck = function () {
        // 不允许单折线设置尾部跟随label
        return !this.options.seriesField && this.options.label.type && this.options.label.type === 'line';
    };
    return LineLayer;
}(view_layer_1.default));
exports.default = LineLayer;
global_1.registerPlotType('line', LineLayer);
//# sourceMappingURL=layer.js.map