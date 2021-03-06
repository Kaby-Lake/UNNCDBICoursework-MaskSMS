"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var EventParser = tslib_1.__importStar(require("./event"));
var view_layer_1 = tslib_1.__importDefault(require("../../base/view-layer"));
var factory_1 = require("../../geoms/factory");
var label_1 = require("./component/label");
var spider_label_1 = tslib_1.__importDefault(require("./component/label/spider-label"));
var global_1 = require("../../base/global");
require("./theme");
var G2_GEOM_MAP = {
    pie: 'interval',
};
var PLOT_GEOM_MAP = {
    pie: 'column',
};
// @ts-ignore
var PieLayer = /** @class */ (function (_super) {
    tslib_1.__extends(PieLayer, _super);
    function PieLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'pie';
        return _this;
    }
    PieLayer.getDefaultOptions = function () {
        return util_1.deepMix({}, _super.getDefaultOptions.call(this), {
            width: 400,
            height: 400,
            title: {
                visible: false,
            },
            description: {
                visible: false,
            },
            forceFit: true,
            padding: 'auto',
            radius: 0.8,
            label: {
                visible: true,
                type: 'inner',
                autoRotate: false,
                adjustPosition: true,
                allowOverlap: false,
                line: {
                    visible: true,
                    smooth: true,
                },
            },
            legend: {
                visible: true,
                position: 'right-center',
            },
            tooltip: {
                visible: true,
                shared: false,
                showCrosshairs: false,
                showMarkers: false,
            },
            pieStyle: {
                stroke: 'white',
                lineWidth: 1,
            },
        });
    };
    PieLayer.prototype.afterRender = function () {
        _super.prototype.afterRender.call(this);
        var options = this.options;
        /** 蜘蛛布局label */
        if (options.label && options.label.visible) {
            // 清除，避免二次渲染
            if (this.labelComponent) {
                this.labelComponent.clear();
            }
            var labelConfig = options.label;
            if (labelConfig.type === 'spider') {
                this.labelComponent = new spider_label_1.default(tslib_1.__assign({ view: this.view, fields: options.colorField ? [options.angleField, options.colorField] : [options.angleField] }, this.options.label));
                this.labelComponent.render();
            }
            else {
                var LabelCtor = label_1.getPieLabel(labelConfig.type);
                this.labelComponent = new LabelCtor(this, options.label);
                this.labelComponent.render();
            }
        }
    };
    PieLayer.prototype.geometryParser = function (dim, type) {
        if (dim === 'g2') {
            return G2_GEOM_MAP[type];
        }
        return PLOT_GEOM_MAP[type];
    };
    PieLayer.prototype.scale = function () {
        var props = this.options;
        _super.prototype.scale.call(this);
        var scales = {};
        scales[props.angleField] = {};
        scales[props.colorField] = { type: 'cat' };
        scales = util_1.deepMix({}, this.config.scales, scales);
        this.setConfig('scales', scales);
    };
    PieLayer.prototype.processData = function (data) {
        var key = this.options.angleField;
        return data.map(function (item) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, item), (_a = {}, _a[key] = typeof item[key] === 'string' ? Number.parseFloat(item[key]) : item[key], _a)));
        });
    };
    PieLayer.prototype.axis = function () {
        return;
    };
    PieLayer.prototype.coord = function () {
        var props = this.options;
        var coordConfig = {
            type: 'theta',
            cfg: {
                radius: props.radius,
                // @ts-ignore 业务定制,不开放配置
                innerRadius: props.innerRadius || 0,
            },
        };
        this.setConfig('coordinate', coordConfig);
    };
    PieLayer.prototype.addGeometry = function () {
        var props = this.options;
        var pie = factory_1.getGeom('interval', 'main', {
            plot: this,
            positionFields: [1, props.angleField],
        });
        pie.adjust = [{ type: 'stack' }];
        this.pie = pie;
        if (props.label) {
            this.label();
        }
        if (props.tooltip && (props.tooltip.fields || props.tooltip.formatter)) {
            this.geometryTooltip();
        }
        this.setConfig('geometry', pie);
    };
    PieLayer.prototype.geometryTooltip = function () {
        this.pie.tooltip = {};
        var tooltipOptions = this.options.tooltip;
        if (tooltipOptions.fields) {
            this.pie.tooltip.fields = tooltipOptions.fields;
        }
        if (tooltipOptions.formatter) {
            this.pie.tooltip.callback = tooltipOptions.formatter;
            if (!tooltipOptions.fields) {
                this.pie.tooltip.fields = [this.options.angleField, this.options.colorField];
            }
        }
    };
    PieLayer.prototype.animation = function () {
        _super.prototype.animation.call(this);
        var props = this.options;
        if (props.animation === false) {
            /** 关闭动画 */
            this.pie.animate = false;
        }
    };
    PieLayer.prototype.annotation = function () {
        return;
    };
    PieLayer.prototype.parseEvents = function (eventParser) {
        if (eventParser) {
            _super.prototype.parseEvents.call(this, eventParser);
        }
        else {
            _super.prototype.parseEvents.call(this, EventParser);
        }
    };
    PieLayer.prototype.label = function () {
        // 不使用 g2 内置label
        this.pie.label = false;
    };
    return PieLayer;
}(view_layer_1.default));
exports.default = PieLayer;
global_1.registerPlotType('pie', PieLayer);
//# sourceMappingURL=layer.js.map