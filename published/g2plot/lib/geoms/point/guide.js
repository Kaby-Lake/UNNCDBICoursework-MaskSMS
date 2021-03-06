"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var base_1 = tslib_1.__importDefault(require("../base"));
function getValuesByField(field, data) {
    var values = [];
    util_1.each(data, function (d) {
        var v = d[field];
        values.push(v);
    });
    return util_1.uniq(values);
}
var COLOR_MAPPER = ['seriesField', 'stackField'];
var GuidePointParser = /** @class */ (function (_super) {
    tslib_1.__extends(GuidePointParser, _super);
    function GuidePointParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuidePointParser.prototype.init = function () {
        var props = this.plot.options;
        this.style = props.point.style;
        if (!props.xField || !props.yField) {
            return;
        }
        this.config = {
            type: 'point',
            position: {
                fields: [props.xField, props.yField],
            },
            tooltip: false,
        };
        // if (this._needParseAttribute('color')) {
        this.parseColor();
        // }
        if (this._needParseAttribute('size')) {
            this.parseSize();
        }
        if (props.point.shape) {
            this.parseShape(props.point.shape);
        }
        if (props.point.style) {
            this.parseStyle();
        }
    };
    GuidePointParser.prototype.parseColor = function () {
        var props = this.plot.options;
        var config = {};
        var mappingField = this._getColorMappingField(props);
        if (mappingField) {
            this._parseColorByField(props, config, mappingField);
        }
        else {
            if (props.point && props.point.color) {
                config.values = [props.point.color];
            }
            else if (props.color) {
                this._parseColor(props, config);
            }
            else {
                var theme = this.plot.getTheme();
                config.values = [theme.defaultColor];
            }
        }
        if (util_1.keys(config).length > 0) {
            this.config.color = config;
        }
    };
    GuidePointParser.prototype.parseSize = function () {
        var props = this.plot.options;
        var config = {};
        config.values = [props.point.size];
        this.config.size = config;
    };
    GuidePointParser.prototype.parseShape = function (shapeCfg) {
        var config = {};
        if (util_1.isString(shapeCfg)) {
            config.values = [shapeCfg];
        }
        else if (util_1.isObject(shapeCfg)) {
            config.fields = shapeCfg.fields;
            config.callback = shapeCfg.callback;
        }
        this.config.shape = config;
    };
    GuidePointParser.prototype.parseStyle = function () {
        var props = this.plot.options;
        var styleProps = props.point && props.point.style;
        var config = {
            fields: null,
            callback: null,
            cfg: null,
        };
        var field = this._getColorMappingField(props);
        if (util_1.isFunction(styleProps) && field) {
            config.fields = [field];
            config.callback = styleProps;
        }
        else {
            config.cfg = styleProps;
        }
        this.config.style = config;
    };
    GuidePointParser.prototype._parseColorByField = function (props, config, field) {
        config.fields = [field];
        if (props.point.color) {
            var count = getValuesByField(field, props.data).length;
            var values = [];
            for (var i = 0; i < count; i++) {
                values.push(props.point.color);
            }
            config.values = values;
        }
        else if (props.color) {
            this._parseColor(props, config);
        }
    };
    GuidePointParser.prototype._parseColor = function (props, config) {
        var field = this._getColorMappingField(props);
        if (util_1.isString(props.color)) {
            config.values = [props.color];
        }
        else if (util_1.isFunction(props.color)) {
            config.callback = props.color;
        }
        else if (util_1.isArray(props.color)) {
            if (field) {
                config.values = props.color;
            }
            else {
                if (props.color.length > 0) {
                    config.values = [props.color[0]];
                }
            }
        }
    };
    GuidePointParser.prototype._needParseAttribute = function (attr) {
        var props = this.plot.options;
        var condition = props.point && util_1.has(props.point, attr);
        return condition;
        // const condition = !this.style || this.style[attr];
        // return condition;
    };
    GuidePointParser.prototype._getColorMappingField = function (props) {
        for (var _i = 0, COLOR_MAPPER_1 = COLOR_MAPPER; _i < COLOR_MAPPER_1.length; _i++) {
            var m = COLOR_MAPPER_1[_i];
            if (util_1.get(props, m)) {
                return [props[m]];
            }
        }
    };
    return GuidePointParser;
}(base_1.default));
exports.default = GuidePointParser;
//# sourceMappingURL=guide.js.map