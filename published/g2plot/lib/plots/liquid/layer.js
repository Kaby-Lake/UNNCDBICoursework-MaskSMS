"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var bbox_1 = tslib_1.__importDefault(require("../../util/bbox"));
var global_1 = require("../../base/global");
var view_layer_1 = tslib_1.__importDefault(require("../../base/view-layer"));
var factory_1 = require("../../geoms/factory");
var scale_1 = require("../../util/scale");
var color_1 = require("../../util/color");
var EventParser = tslib_1.__importStar(require("./event"));
require("./geometry/shape/liquid");
require("./animation/liquid-move-in");
var G2_GEOM_MAP = {
    column: 'interval',
};
var PLOT_GEOM_MAP = {
    interval: 'liquid',
};
var LiquidLayer = /** @class */ (function (_super) {
    tslib_1.__extends(LiquidLayer, _super);
    function LiquidLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'liquid';
        _this.shouldFadeInAnnotation = true;
        return _this;
    }
    LiquidLayer.getDefaultOptions = function () {
        var cfg = {
            padding: [0, 0, 0, 0],
            animation: {
                factor: 0.4,
                easing: 'easeExpOut',
                duration: 800,
            },
            liquidStyle: {
                lineWidth: 2,
            },
            color: '#6a99f9',
            interactions: [],
            statistic: {
                visible: true,
            },
        };
        return util_1.deepMix({}, _super.getDefaultOptions.call(this), cfg);
    };
    LiquidLayer.prototype.beforeInit = function () {
        var _a = this.options, min = _a.min, max = _a.max, value = _a.value;
        if (!util_1.isNumber(min)) {
            throw new Error('The min value of Liquid is required, and the type of min must be Number.');
        }
        if (!util_1.isNumber(max)) {
            throw new Error('The max value of Liquid is required, and the type of max must be Number.');
        }
        if (!util_1.isNumber(value)) {
            throw new Error('The value of Liquid is required, and the type of value must be Number.');
        }
    };
    LiquidLayer.prototype.init = function () {
        this.options.data = [{}];
        _super.prototype.init.call(this);
    };
    LiquidLayer.prototype.coord = function () {
        return;
    };
    LiquidLayer.prototype.scale = function () {
        var props = this.options;
        var min = props.min, max = props.max;
        var scales = {
            value: {},
        };
        scale_1.extractScale(scales.value, {
            min: Math.min(min, max),
            max: Math.max(min, max),
        });
        // @ts-ignore
        this.setConfig('scales', scales);
        _super.prototype.scale.call(this);
    };
    LiquidLayer.prototype.axis = function () {
        this.setConfig('axes', false);
    };
    LiquidLayer.prototype.adjustLiquid = function (liquid) {
        var props = this.options;
        liquid.shape = {
            values: ['liquid-fill-gauge'],
        };
        liquid.tooltip = false;
        var liquidStyle = props.liquidStyle;
        if (util_1.isFunction(liquidStyle))
            liquidStyle = liquidStyle();
        if (liquidStyle) {
            liquid.style = liquidStyle;
        }
    };
    LiquidLayer.prototype.addGeometry = function () {
        var liquid = factory_1.getGeom('interval', 'main', {
            positionFields: [1, 'value'],
            plot: this,
        });
        this.adjustLiquid(liquid);
        this.liquid = liquid;
        this.setConfig('geometry', liquid);
    };
    LiquidLayer.prototype.animation = function () {
        var props = this.options;
        if (props.animation === false) {
            /** 关闭动画 */
            this.liquid.animate = false;
        }
        else {
            var factor = util_1.get(props, 'animation.factor');
            var easing = util_1.get(props, 'animation.easing');
            var duration = util_1.get(props, 'animation.duration');
            this.liquid.animate = {
                appear: {
                    animation: 'liquidMoveIn',
                    factor: factor,
                    easing: easing,
                    duration: duration,
                },
            };
        }
    };
    LiquidLayer.prototype.geometryParser = function (dim, type) {
        if (dim === 'g2') {
            return G2_GEOM_MAP[type];
        }
        return PLOT_GEOM_MAP[type];
    };
    LiquidLayer.prototype.annotation = function () {
        var annotationConfigs = [];
        var statisticConfig = this.extractStatistic();
        annotationConfigs.push(statisticConfig);
        this.setConfig('annotations', annotationConfigs);
    };
    LiquidLayer.prototype.extractStatistic = function () {
        var props = this.options;
        var statistic = props.statistic || {};
        var content;
        if (util_1.isFunction(statistic.formatter)) {
            content = statistic.formatter(props.value);
        }
        else {
            content = "" + props.value;
        }
        var fontSize;
        var shadowBlur;
        if (content) {
            var contentWidth = Math.min(this.width, this.height);
            fontSize = (contentWidth / content.length) * 0.5;
            shadowBlur = Math.max(1, Math.ceil(0.025 * fontSize));
        }
        var opacity;
        if (statistic.visible === false) {
            return;
        }
        var statisticConfig = util_1.deepMix({
            style: {
                fontSize: fontSize,
                shadowBlur: shadowBlur,
            },
        }, statistic, {
            top: true,
            content: content,
            type: 'text',
            position: ['50%', '50%'],
            style: {
                opacity: opacity,
                fill: 'transparent',
                shadowColor: 'transparent',
                textAlign: 'center',
            },
        });
        delete statisticConfig.visible;
        delete statisticConfig.formatter;
        delete statisticConfig.adjustColor;
        return statisticConfig;
    };
    LiquidLayer.prototype.parseEvents = function () {
        _super.prototype.parseEvents.call(this, EventParser);
    };
    LiquidLayer.prototype.afterRender = function () {
        var _a;
        if ((_a = this.options.statistic) === null || _a === void 0 ? void 0 : _a.visible) {
            this.fadeInAnnotation();
        }
        var options = this.options;
        var padding = options.padding ? options.padding : this.config.theme.padding;
        /** defaultState */
        if (options.defaultState && padding !== 'auto') {
            this.stateController.defaultStates(options.defaultState);
        }
        /** autopadding */
        if (padding === 'auto') {
            this.paddingController.processAutoPadding();
        }
    };
    LiquidLayer.prototype.processData = function () {
        var props = this.options;
        return [{ _: '_', value: props.value }];
    };
    LiquidLayer.prototype.changeValue = function (value) {
        var props = this.options;
        props.value = value;
        this.changeData([]);
    };
    LiquidLayer.prototype.fadeInAnnotation = function () {
        var _this = this;
        var props = this.options;
        var textShape = this.view.foregroundGroup.findAll(function (el) {
            return el.get('name') === 'annotation-text';
        })[0];
        var animation = props.animation || {};
        var colorStyle = this.calcAnnotationColorStyle();
        if (this.shouldFadeInAnnotation) {
            textShape.animate(colorStyle, animation.duration * Math.min(1, 1.5 * animation.factor), null, function () {
                _this.shouldFadeInAnnotation = false;
            });
        }
        else {
            util_1.forIn(colorStyle, function (v, k) { return textShape.attr(k, v); });
        }
    };
    LiquidLayer.prototype.calcAnnotationColorStyle = function () {
        var props = this.options;
        var lightColorStyle = { fill: '#f6f6f6', shadowColor: 'black' };
        var darkColorStyle = { fill: '#303030', shadowColor: 'white' };
        if (util_1.get(props, 'statistic.adjustColor') === false) {
            return {
                fill: util_1.get(props, 'statistic.style.fill', darkColorStyle.fill),
                shadowColor: util_1.get(props, 'statistic.style.shadowColor', darkColorStyle.shadowColor),
            };
        }
        var min = props.min, max = props.max;
        var value = props.value;
        min = Math.min(min, max);
        max = Math.max(min, max);
        var percent;
        if (min == max) {
            percent = 1;
        }
        else {
            percent = (value - min) / (max - min);
        }
        if (percent > 0.55) {
            var waveColor = this.options.color;
            var waveOpacity = 0.8;
            var rgb = color_1.rgb2arr(waveColor);
            var gray = Math.round(rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) / waveOpacity;
            return gray < 156 ? lightColorStyle : darkColorStyle;
        }
        return darkColorStyle;
    };
    LiquidLayer.prototype.updateConfig = function (cfg) {
        _super.prototype.updateConfig.call(this, cfg);
        this.shouldFadeInAnnotation = true;
    };
    LiquidLayer.prototype.getViewRange = function () {
        var viewRange = _super.prototype.getViewRange.call(this);
        var liquidStyle = this.options.liquidStyle;
        var strokeWidth = liquidStyle.lineWidth ? liquidStyle.lineWidth : 2;
        var minX = viewRange.minX, minY = viewRange.minY, width = viewRange.width, height = viewRange.height;
        var size = Math.min(width, height) - strokeWidth * 2;
        var cx = minX + width / 2;
        var cy = minY + height / 2;
        var x = cx - size / 2;
        var y = cy - size / 2;
        return new bbox_1.default(x, y, size, size);
    };
    return LiquidLayer;
}(view_layer_1.default));
exports.default = LiquidLayer;
global_1.registerPlotType('liquid', LiquidLayer);
//# sourceMappingURL=layer.js.map