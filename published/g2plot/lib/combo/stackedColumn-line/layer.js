"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var global_1 = require("../../base/global");
var util_1 = require("@antv/util");
var layer_1 = tslib_1.__importDefault(require("../column-line/layer"));
var layer_2 = tslib_1.__importDefault(require("../../plots/stacked-column/layer"));
var theme_1 = require("../../theme");
var defaultLineConfig = {
    color: '#f5bc32',
    lineSize: 4,
    connectNull: true,
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
    },
};
var defaultColumnConfig = {
    color: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E8684A', '#6DC8EC', '#9270CA', '#FF9D4D', '#269A99', '#FF99C3'],
};
var defaultYAxisConfig = {
    visible: true,
    colorMapping: true,
    grid: {
        visible: true,
    },
    line: {
        visible: false,
    },
    tickLine: {
        visible: false,
    },
    label: {
        visible: true,
        autoHide: true,
        autoRotate: false,
    },
    title: {
        autoRotate: true,
        visible: false,
        offset: 12,
    },
};
var StackedColumnLineLayer = /** @class */ (function (_super) {
    tslib_1.__extends(StackedColumnLineLayer, _super);
    function StackedColumnLineLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'groupedColumnLine';
        _this.requiredField = ['xField', 'yField', 'columnStackField'];
        return _this;
    }
    StackedColumnLineLayer.getDefaultOptions = function () {
        return util_1.deepMix({}, _super.getDefaultOptions.call(this), {
            yAxis: {
                leftConfig: util_1.deepMix({}, defaultYAxisConfig, { colorMapping: false }),
                rightConfig: defaultYAxisConfig,
            },
            lineConfig: defaultLineConfig,
            columnConfig: defaultColumnConfig,
            legend: {
                visible: true,
            },
        });
    };
    StackedColumnLineLayer.prototype.beforeInit = function () {
        var _a, _b;
        var stackedValue = this.getValueByStackField();
        var _c = this, options = _c.options, initialOptions = _c.initialOptions;
        if (options.lineSeriesField) {
            options.yAxis.rightConfig.colorMapping = false;
            if (!((_a = initialOptions.lineConfig) === null || _a === void 0 ? void 0 : _a.lineSize)) {
                options.lineConfig.lineSize = 3;
            }
            if (!((_b = initialOptions.lineConfig) === null || _b === void 0 ? void 0 : _b.color)) {
                var _d = theme_1.getGlobalTheme(), colors = _d.colors, colors_20 = _d.colors_20;
                var seriesValue = this.getValueBySeriesField();
                var colorSeries_1 = seriesValue.length > colors.length ? colors_20 : colors;
                var colorPlates_1 = [];
                var startIndex_1 = stackedValue.length;
                util_1.each(seriesValue, function (v, index) {
                    colorPlates_1.push(colorSeries_1[index + startIndex_1]);
                });
                options.lineConfig.color = colorPlates_1;
            }
        }
        var color = this.options.columnConfig.color;
        this.options.columnConfig.color = color.slice(0, stackedValue.length);
    };
    StackedColumnLineLayer.prototype.drawColumn = function () {
        var _this = this;
        var _a = this.options, data = _a.data, xField = _a.xField, yField = _a.yField, columnStackField = _a.columnStackField, xAxis = _a.xAxis, tooltip = _a.tooltip, columnConfig = _a.columnConfig, events = _a.events;
        var column = this.createLayer(layer_2.default, data[0], tslib_1.__assign({ xField: xField, yField: yField[0], stackField: columnStackField, xAxis: xAxis, yAxis: util_1.deepMix({}, this.yAxis(0), {
                grid: {
                    visible: true,
                },
                nice: true,
            }), legend: {
                visible: false,
            }, tooltip: util_1.deepMix({}, tooltip, {
                showMarkers: false,
                custom: {
                    onChange: function (containerDom, ev) {
                        _this.tooltip(containerDom, ev);
                    },
                },
            }), events: events }, columnConfig));
        column.render();
    };
    StackedColumnLineLayer.prototype.customLegend = function () {
        var _this = this;
        var _a = this.options, yField = _a.yField, legend = _a.legend;
        var colors = this.colors;
        var container = this.container.addGroup();
        var legendCfg = legend;
        var symbols = ['square', 'circle'];
        util_1.each(this.geomLayers, function (geom, index) {
            var legend;
            if (geom.options.seriesField) {
                var values = _this.getValueBySeriesField();
                legend = _this.createNormalLegend(values, symbols[index], colors[index], legendCfg, container);
            }
            else if (geom.options.stackField) {
                var values = _this.getValueByStackField();
                legend = _this.createNormalLegend(values, symbols[index], colors[index], legendCfg, container);
            }
            else {
                legend = _this.createSingleLegend(yField[index], symbols[index], colors[index], legendCfg, container);
            }
            _this.legends.push(legend);
        });
        // 使用legend做图层筛选
        util_1.each(this.geomLayers, function (geom, index) {
            if (geom.options.seriesField) {
                _this.multipleLegendFilter(index, geom.options.seriesField);
            }
            else if (geom.options.stackField) {
                _this.multipleLegendFilter(index, geom.options.stackField);
            }
            else {
                _this.legendFilter(index);
            }
        });
    };
    StackedColumnLineLayer.prototype.getValueByStackField = function () {
        var _a = this.options, columnStackField = _a.columnStackField, data = _a.data;
        var columnData = data[0];
        var values = [];
        util_1.each(columnData, function (d) {
            var v = d[columnStackField];
            if (!util_1.contains(values, v)) {
                values.push(v);
            }
        });
        return values;
    };
    StackedColumnLineLayer.prototype.getUnCheckedValue = function () {
        var value = [];
        util_1.each(this.legends, function (legend) {
            var uncheckedItems = legend.getItemsByState('unchecked');
            util_1.each(uncheckedItems, function (item) {
                value.push(item.name);
            });
        });
        return value;
    };
    StackedColumnLineLayer.prototype.getMockData = function (index) {
        var _a = this.options, xField = _a.xField, yField = _a.yField, columnStackField = _a.columnStackField;
        var mockA = {};
        mockA[xField] = 'null_1';
        mockA[yField[index]] = 0;
        mockA[columnStackField] = 'null_a';
        var mockB = {};
        mockB[xField] = 'null_1';
        mockB[yField[index]] = 1;
        mockB[columnStackField] = 'null_a';
        return [mockA, mockB];
    };
    return StackedColumnLineLayer;
}(layer_1.default));
exports.default = StackedColumnLineLayer;
global_1.registerPlotType('stackedColumnLine', StackedColumnLineLayer);
//# sourceMappingURL=layer.js.map