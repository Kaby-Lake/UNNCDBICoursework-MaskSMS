"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scale_1 = require("@antv/scale");
var util_1 = require("@antv/util");
var math_1 = require("../util/math");
var GuideLine = /** @class */ (function () {
    function GuideLine(cfg) {
        util_1.assign(this, cfg);
        this._init();
    }
    GuideLine.prototype._init = function () {
        var _a = this.plot.options, yField = _a.yField, data = _a.data;
        var plotData = this.plot.processData(data);
        if (!util_1.isNumber(plotData[yField])) {
            return;
        }
        var defaultStyle = this.getDefaultStyle();
        var baseConfig = {
            type: 'line',
            top: true,
            start: this.cfg.start,
            end: this.cfg.end,
        };
        baseConfig.style = util_1.deepMix({}, defaultStyle.line.style, this.cfg.lineStyle);
        baseConfig.text = util_1.deepMix({}, defaultStyle.text, this.cfg.text);
        if (this.cfg.type) {
            var stateValue = this._getState(this.cfg.type);
            var scale = this.getYScale();
            var percent = (1.0 - scale.scale(stateValue)) * 100 + "%";
            var start = ['0%', percent];
            var end = ['100%', percent];
            this.config = util_1.mix({
                start: start,
                end: end,
            }, baseConfig);
        }
        else {
            var _b = this.cfg, start_1 = _b.start, end_1 = _b.end;
            this.config = util_1.clone(baseConfig);
            var xScale_1 = this.getXScale();
            var yScale_1 = this.getYScale();
            var startData_1 = util_1.clone(start_1);
            var endData_1 = util_1.clone(end_1);
            util_1.each(start_1, function (value, index) {
                if (!util_1.contains(util_1.toArray(start_1[index]), '%') || util_1.isNumber(start_1[index])) {
                    if (index === 0) {
                        startData_1[index] = xScale_1.scale(start_1[0]) * 100 + "%";
                    }
                    else {
                        startData_1[index] = (1.0 - yScale_1.scale(start_1[1])) * 100 + "%";
                    }
                }
            });
            util_1.each(end_1, function (value, index) {
                if (!util_1.contains(util_1.toArray(end_1[index]), '%') || util_1.isNumber(end_1[index])) {
                    if (index === 0) {
                        endData_1[index] = xScale_1.scale(end_1[0]) * 100 + "%";
                    }
                    else {
                        endData_1[index] = (1.0 - yScale_1.scale(end_1[1])) * 100 + "%";
                    }
                }
            });
            this.config.start = startData_1;
            this.config.end = endData_1;
        }
    };
    GuideLine.prototype.getYScale = function () {
        var minValue = this._getState('min');
        var maxValue = this._getState('max');
        var Scale = scale_1.getScale('linear');
        // 重新组织scale并使用scale的min和max来计算guide point的百分比位置，以避免受nice的影响
        var scale = new Scale(util_1.mix({}, {
            min: this.plot.type === 'column' ? 0 : minValue,
            max: maxValue,
            nice: true,
            values: this.values,
        }, this.plot.config.scales[this.plot.options.yField]));
        return scale;
    };
    GuideLine.prototype.getXScale = function () {
        var values = this.extractXValue();
        if (util_1.isString(values[0])) {
            var Scale = scale_1.getScale('cat');
            var scale = new Scale(util_1.mix({}, {
                values: values,
            }, this.plot.config.scales[this.plot.options.xField]));
            return scale;
        }
        else {
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            var Scale = scale_1.getScale('linear');
            var scale = new Scale(util_1.mix({}, {
                min: min,
                max: max,
                nice: true,
                values: values,
            }, this.plot.config.scales[this.plot.options.xField]));
            return scale;
        }
    };
    GuideLine.prototype._getState = function (type) {
        this.values = this._extractValues();
        if (type === 'median') {
            return math_1.getMedian(this.values);
        }
        if (type === 'mean') {
            return math_1.getMean(this.values);
        }
        if (type === 'max') {
            return Math.max.apply(Math, this.values);
        }
        if (type === 'min') {
            return Math.min.apply(Math, this.values);
        }
    };
    GuideLine.prototype._extractValues = function () {
        var props = this.plot.options;
        var field = props.yField;
        var values = [];
        var data = this.plot.processData(props.data);
        util_1.each(data, function (d) {
            if (util_1.isArray(d[field])) {
                values.push.apply(values, d[field]);
            }
            else {
                values.push(d[field]);
            }
        });
        return values;
    };
    GuideLine.prototype.extractXValue = function () {
        var props = this.plot.options;
        var field = props.xField;
        var values = [];
        var data = this.plot.processData(props.data);
        util_1.each(data, function (d) {
            if (util_1.isArray(d[field])) {
                values.push.apply(values, d[field]);
            }
            else {
                values.push(d[field]);
            }
        });
        return values;
    };
    GuideLine.prototype.getDefaultStyle = function () {
        this.getDefaultTextAlign();
        return {
            line: {
                style: {
                    lineWidth: 2,
                    stroke: '#333333',
                    opacity: 0.7,
                    lineDash: [0, 0],
                },
            },
            text: {
                offsetY: -5,
                style: {
                    fontSize: 14,
                    stroke: 'white',
                    lineWidth: 2,
                    textAlign: this.getDefaultTextAlign(),
                },
            },
        };
    };
    GuideLine.prototype.getDefaultTextAlign = function () {
        var textConfig = this.cfg.text;
        if (textConfig) {
            if (!textConfig.position || textConfig.position === 'start') {
                return 'left';
            }
            if (textConfig.position === 'center') {
                return 'center';
            }
            if (textConfig.position === 'end') {
                return 'right';
            }
        }
    };
    return GuideLine;
}());
exports.default = GuideLine;
//# sourceMappingURL=guide-line.js.map