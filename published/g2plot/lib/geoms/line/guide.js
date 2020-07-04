"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var main_1 = tslib_1.__importDefault(require("./main"));
var GuideLineParser = /** @class */ (function (_super) {
    tslib_1.__extends(GuideLineParser, _super);
    function GuideLineParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideLineParser.prototype.init = function () {
        var props = this.plot.options;
        if (!props.xField || !props.yField) {
            return;
        }
        this.config = {
            type: 'line',
            position: {
                fields: [props.xField, props.yField],
            },
            tooltip: false,
        };
        if (this._getColorMappingField() || this._needParseAttribute('color')) {
            this.parseColor();
        }
        if (this._needParseAttribute('size')) {
            this.parseSize();
        }
        if (props.line.style) {
            this.parseStyle();
        }
        if (props.smooth) {
            this.config.shape = { values: ['smooth'] };
        }
    };
    GuideLineParser.prototype.parseSize = function () {
        var props = this.plot.options;
        var config = {};
        if (props.line.size) {
            config.values = [props.line.size];
        }
        else {
            // line作为辅助图形没有在style里指定size属性的情况下，设置默认值
            config.values = [2];
        }
        this.config.size = config;
    };
    GuideLineParser.prototype.parseColor = function () {
        var props = this.plot.options;
        var config = {};
        var colorField = this._getColorMappingField();
        if (colorField) {
            config.fields = colorField;
        }
        if (props.line.color) {
            config.values = [props.line.color];
        }
        else {
            // line作为辅助图形没有在style里指定color属性的情况下，默认接受主体图形的透传
            if (util_1.isString(props.color)) {
                config.values = [props.color];
            }
            else if (util_1.isFunction(props.color)) {
                config.fields = colorField;
                config.callback = props.color;
            }
            else if (util_1.isArray(props.color)) {
                if (colorField) {
                    config.values = props.color;
                }
                else {
                    if (props.color.length > 0) {
                        config.values = [props.color[0]];
                    }
                }
            }
        }
        this.config.color = config;
    };
    GuideLineParser.prototype.parseStyle = function () {
        var props = this.plot.options;
        var styleProps = props.line.style;
        var config = {};
        if (util_1.isFunction(styleProps)) {
            config.fields = this.config.position.fields;
            config.callback = styleProps;
        }
        else {
            config.cfg = styleProps;
        }
        this.config.style = config;
    };
    GuideLineParser.prototype._needParseAttribute = function (attr) {
        var props = this.plot.options;
        if (props[attr]) {
            return true;
        }
        else if (props.line[attr]) {
            return true;
        }
        return false;
    };
    GuideLineParser.prototype._getColorMappingField = function () {
        var props = this.plot.options;
        var colorMapper = ['stackField', 'seriesField'];
        for (var _i = 0, colorMapper_1 = colorMapper; _i < colorMapper_1.length; _i++) {
            var m = colorMapper_1[_i];
            if (util_1.get(props, m)) {
                return [props[m]];
            }
        }
    };
    return GuideLineParser;
}(main_1.default));
exports.default = GuideLineParser;
//# sourceMappingURL=guide.js.map