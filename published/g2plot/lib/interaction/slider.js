"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dependents_1 = require("../dependents");
var bbox_1 = tslib_1.__importDefault(require("../util/bbox"));
var util_1 = require("@antv/util");
var base_1 = tslib_1.__importDefault(require("./base"));
var data_range_1 = require("./helper/data-range");
var DEFAULT_PADDING = 4;
var DEFAULT_SIZE = 16;
var getValidSliderConfig = function (cfg) {
    if (cfg === void 0) { cfg = {}; }
    var _cfg = tslib_1.__assign({ type: 'horizontal', start: 0, end: 1, width: undefined, height: undefined, padding: [0, 0, 0, 0], backgroundStyle: {}, foregroundStyle: {}, handlerStyle: {}, textStyle: {}, trendCfg: {} }, cfg);
    // default padding
    if (!cfg.padding) {
        _cfg.padding =
            _cfg.type === 'horizontal' ? [DEFAULT_PADDING, 0, DEFAULT_PADDING, 0] : [0, DEFAULT_PADDING, 0, DEFAULT_PADDING];
    }
    // default size
    if (!cfg.height) {
        _cfg.height = DEFAULT_SIZE;
    }
    if (!cfg.width) {
        _cfg.width = DEFAULT_SIZE;
    }
    // start & end
    var start = util_1.clamp(Math.min(_cfg.start, _cfg.end), 0, 1);
    var end = util_1.clamp(Math.max(_cfg.start, _cfg.end), 0, 1);
    _cfg.start = start;
    _cfg.end = end;
    return _cfg;
};
var SliderInteraction = /** @class */ (function (_super) {
    tslib_1.__extends(SliderInteraction, _super);
    function SliderInteraction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChangeFn = util_1.throttle(_this.onChange.bind(_this), 20, { leading: true });
        return _this;
    }
    SliderInteraction.getInteractionRange = function (layerRange, interaction) {
        var config = getValidSliderConfig(interaction);
        var _a = config.padding || [0, 0, 0, 0], paddingTop = _a[0], paddingRight = _a[1], paddingBottom = _a[2], paddingLeft = _a[3];
        if (config.type === 'horizontal') {
            var bbox = new bbox_1.default(layerRange.minX, layerRange.maxY - config.height - paddingTop - paddingBottom, layerRange.width, config.height + paddingTop + paddingBottom);
            return bbox;
        }
        else {
            return new bbox_1.default(layerRange.maxX - config.width - paddingLeft - paddingRight, layerRange.minY, config.width + paddingLeft + paddingRight, layerRange.height);
        }
    };
    SliderInteraction.prototype.render = function () {
        var _this = this;
        var layer = this.getViewLayer();
        var view = this.view;
        // 设置初始化的 start/end
        var config = getValidSliderConfig(this.getInteractionConfig());
        this.curStart = config.start;
        this.curEnd = config.end;
        this.xScaleCfg = undefined;
        // 等待 view 每次 render 完成后更新 slider 组件
        var callback = function () {
            if (util_1.isEmpty(layer.options.data)) {
                return;
            }
            if (!_this.xScaleCfg) {
                // 初始化配置和数据
                var xScale = view.getXScale();
                _this.xScaleCfg = {
                    field: xScale.field,
                    values: xScale.values || [],
                };
                // 初始化 data
                view.data(_this.getSliderData(_this.curStart, _this.curEnd));
                view.render();
            }
            else {
                _this.renderSlider();
            }
        };
        view.on(dependents_1.VIEW_LIFE_CIRCLE.AFTER_PAINT, callback);
        this.addDisposable(function () { return view.off(dependents_1.VIEW_LIFE_CIRCLE.AFTER_PAINT, callback); });
        view.on(dependents_1.VIEW_LIFE_CIRCLE.AFTER_RENDER, callback);
        this.addDisposable(function () { return view.off(dependents_1.VIEW_LIFE_CIRCLE.AFTER_RENDER, callback); });
    };
    SliderInteraction.prototype.start = function () {
        return;
    };
    SliderInteraction.prototype.clear = function () {
        if (this.slider) {
            this.slider.destroy();
            this.slider = null;
        }
        if (this.container) {
            this.container.remove(true);
            this.container = null;
        }
    };
    SliderInteraction.prototype.renderSlider = function () {
        if (!this.slider) {
            this.container = this.canvas.addGroup();
            this.slider = new dependents_1.Slider(tslib_1.__assign(tslib_1.__assign({}, this.getSliderConfig()), { container: this.container }));
            this.slider.init();
            this.slider.render();
            this.slider.on('sliderchange', this.onChangeFn);
        }
        else {
            this.slider.update(this.getSliderConfig());
            this.slider.render();
        }
    };
    SliderInteraction.prototype.getSliderConfig = function () {
        var view = this.view;
        var panelRange = view.coordinateBBox;
        var range = this.getRange();
        var config = getValidSliderConfig(this.getInteractionConfig());
        var _a = config || {}, _b = _a.padding, padding = _b === void 0 ? [0, 0, 0, 0] : _b, backgroundStyle = _a.backgroundStyle, foregroundStyle = _a.foregroundStyle, handlerStyle = _a.handlerStyle, textStyle = _a.textStyle, _c = _a.trendCfg, trendCfg = _c === void 0 ? {} : _c;
        var paddingTop = padding[0], paddingRight = padding[1], paddingBottom = padding[2], paddingLeft = padding[3];
        var _d = this.getSliderMinMaxText(this.curStart, this.curEnd), minText = _d.minText, maxText = _d.maxText;
        var cfg = {
            x: panelRange.minX + paddingLeft,
            y: range.minY + paddingTop,
            width: panelRange.width - paddingLeft - paddingRight,
            height: range.height - paddingTop - paddingBottom,
            start: this.curStart,
            end: this.curEnd,
            minText: minText,
            maxText: maxText,
            backgroundStyle: backgroundStyle,
            foregroundStyle: foregroundStyle,
            handlerStyle: handlerStyle,
            textStyle: textStyle,
            trendCfg: tslib_1.__assign(tslib_1.__assign({ isArea: false, smooth: false }, trendCfg), { data: this.getSliderTrendData() }),
        };
        return cfg;
    };
    SliderInteraction.prototype.getSliderTrendData = function () {
        var _a = this.getViewLayer().options, data = _a.data, yField = _a.yField;
        return util_1.map(data, function (item) { return item[yField]; });
    };
    SliderInteraction.prototype.getSliderData = function (start, end) {
        var origData = this.getViewLayer().getData();
        var length = util_1.size(this.xScaleCfg.values);
        var startIdx = Math.round(start * length);
        var endIdx = Math.max(startIdx + 1, Math.round(end * length));
        return data_range_1.getDataByScaleRange(this.xScaleCfg.field, this.xScaleCfg.values, origData, [startIdx, endIdx]);
    };
    SliderInteraction.prototype.getSliderMinMaxText = function (start, end) {
        var _a = this.getViewLayer().options, _b = _a.data, data = _b === void 0 ? [] : _b, xField = _a.xField;
        var length = util_1.size(data);
        var startIdx = Math.round(start * length);
        var endIdx = Math.max(startIdx + 1, Math.round(end * length));
        var newData = data.slice(startIdx, endIdx);
        return {
            minText: newData.length > 0 ? util_1.head(newData)[xField] : '',
            maxText: newData.length > 0 ? util_1.last(newData)[xField] : '',
        };
    };
    SliderInteraction.prototype.onChange = function (range) {
        var view = this.view;
        var start = util_1.clamp(Math.min(range[0], range[1]), 0, 1);
        var end = util_1.clamp(Math.max(range[0], range[1]), 0, 1);
        var data = this.getSliderData(start, end);
        var _a = this.getSliderMinMaxText(start, end), minText = _a.minText, maxText = _a.maxText;
        this.curStart = start;
        this.curEnd = end;
        this.slider.update({
            start: start,
            end: end,
            minText: minText,
            maxText: maxText,
        });
        this.slider.render();
        var origAnimate = view.getOptions().animate;
        view.animate(false);
        view.changeData(data);
        view.animate(origAnimate);
    };
    return SliderInteraction;
}(base_1.default));
exports.default = SliderInteraction;
//# sourceMappingURL=slider.js.map