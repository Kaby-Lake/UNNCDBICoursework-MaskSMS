"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var base_1 = tslib_1.__importDefault(require("../base"));
var LineParser = /** @class */ (function (_super) {
    tslib_1.__extends(LineParser, _super);
    function LineParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineParser.prototype.init = function () {
        var props = this.plot.options;
        this.config = {
            type: 'line',
            position: {
                fields: [props.xField, props.yField],
            },
            connectNulls: props.connectNulls,
        };
        if (props.lineSize) {
            this.parseSize();
        }
        if (props.smooth) {
            this.config.shape = { values: ['smooth'] };
        }
        if (props.step) {
            this.config.shape = { values: [props.step] };
        }
        if (props.seriesField || props.color) {
            this.parseColor();
        }
        if (props.lineStyle) {
            this.parseStyle();
        }
    };
    LineParser.prototype.parseSize = function () {
        var sizeProps = this.plot.options.lineSize;
        var config = {};
        if (util_1.isFunction(sizeProps)) {
            config.callback = sizeProps;
        }
        else {
            config.values = [sizeProps];
        }
        this.config.size = config;
    };
    LineParser.prototype.parseColor = function () {
        var props = this.plot.options;
        var config = {};
        if (props.seriesField) {
            config.fields = [props.seriesField];
        }
        if (util_1.has(props, 'color')) {
            var color = props.color;
            if (util_1.isString(color)) {
                config.values = [color];
            }
            else if (util_1.isFunction(color)) {
                config.callback = color;
            }
            else if (util_1.isArray(color)) {
                if (props.seriesField) {
                    config.values = color;
                }
                else {
                    if (color.length > 0) {
                        config.values = [color[0]];
                    }
                }
            }
        }
        this.config.color = config;
    };
    LineParser.prototype.parseStyle = function () {
        var props = this.plot.options;
        var styleProps = props.lineStyle;
        var config = {
            fields: null,
            callback: null,
            cfg: null,
        };
        if (util_1.isFunction(styleProps) && props.seriesField) {
            config.fields = [props.seriesField];
            config.callback = styleProps;
        }
        else {
            config.cfg = styleProps;
        }
        this.config.style = config;
    };
    return LineParser;
}(base_1.default));
exports.default = LineParser;
//# sourceMappingURL=main.js.map