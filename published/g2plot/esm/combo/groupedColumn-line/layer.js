import { __assign, __extends } from "tslib";
import { registerPlotType } from '../../base/global';
import { deepMix, each, contains } from '@antv/util';
import ColumnLineLayer from '../column-line/layer';
import GroupedColumnLayer from '../../plots/grouped-column/layer';
import { getGlobalTheme } from '../../theme';
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
var GroupedColumnLineLayer = /** @class */ (function (_super) {
    __extends(GroupedColumnLineLayer, _super);
    function GroupedColumnLineLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'groupedColumnLine';
        _this.requiredField = ['xField', 'yField', 'columnGroupField'];
        return _this;
    }
    GroupedColumnLineLayer.getDefaultOptions = function () {
        return deepMix({}, _super.getDefaultOptions.call(this), {
            yAxis: {
                leftConfig: deepMix({}, defaultYAxisConfig, { colorMapping: false }),
                rightConfig: defaultYAxisConfig,
            },
            lineConfig: defaultLineConfig,
            columnConfig: defaultColumnConfig,
            legend: {
                visible: true,
            },
        });
    };
    GroupedColumnLineLayer.prototype.beforeInit = function () {
        var _a, _b;
        var _c = this, options = _c.options, initialOptions = _c.initialOptions;
        var groupedValue = this.getValueByGroupField();
        if (options.lineSeriesField) {
            options.yAxis.rightConfig.colorMapping = false;
            if (!((_a = initialOptions.lineConfig) === null || _a === void 0 ? void 0 : _a.lineSize)) {
                options.lineConfig.lineSize = 3;
            }
            if (!((_b = initialOptions.lineConfig) === null || _b === void 0 ? void 0 : _b.color)) {
                var _d = getGlobalTheme(), colors = _d.colors, colors_20 = _d.colors_20;
                var seriesValue = this.getValueBySeriesField();
                var colorSeries_1 = seriesValue.length > colors.length ? colors_20 : colors;
                var colorPlates_1 = [];
                var startIndex_1 = groupedValue.length;
                each(seriesValue, function (v, index) {
                    colorPlates_1.push(colorSeries_1[index + startIndex_1]);
                });
                options.lineConfig.color = colorPlates_1;
            }
        }
        var color = this.options.columnConfig.color;
        this.options.columnConfig.color = color.slice(0, groupedValue.length);
    };
    GroupedColumnLineLayer.prototype.drawColumn = function () {
        var _this = this;
        var _a = this.options, data = _a.data, xField = _a.xField, yField = _a.yField, columnGroupField = _a.columnGroupField, xAxis = _a.xAxis, tooltip = _a.tooltip, columnConfig = _a.columnConfig, events = _a.events;
        var column = this.createLayer(GroupedColumnLayer, data[0], __assign({ xField: xField, yField: yField[0], groupField: columnGroupField, xAxis: xAxis, yAxis: deepMix({}, this.yAxis(0), {
                grid: {
                    visible: true,
                },
                nice: true,
            }), legend: {
                visible: false,
            }, tooltip: deepMix({}, tooltip, {
                showMarkers: false,
                custom: {
                    onChange: function (containerDom, ev) {
                        _this.tooltip(containerDom, ev);
                    },
                },
            }), events: events }, columnConfig));
        column.render();
    };
    GroupedColumnLineLayer.prototype.customLegend = function () {
        var _this = this;
        var _a = this.options, yField = _a.yField, legend = _a.legend;
        var colors = this.colors;
        var container = this.container.addGroup();
        var legendCfg = legend;
        var symbols = ['square', 'circle'];
        each(this.geomLayers, function (geom, index) {
            var legend;
            if (geom.options.seriesField) {
                var values = _this.getValueBySeriesField();
                legend = _this.createNormalLegend(values, symbols[index], colors[index], legendCfg, container);
            }
            else if (geom.options.groupField) {
                var values = _this.getValueByGroupField();
                legend = _this.createNormalLegend(values, symbols[index], colors[index], legendCfg, container);
            }
            else {
                legend = _this.createSingleLegend(yField[index], symbols[index], colors[index], legendCfg, container);
            }
            _this.legends.push(legend);
        });
        // 使用legend做图层筛选
        each(this.geomLayers, function (geom, index) {
            if (geom.options.seriesField) {
                _this.multipleLegendFilter(index, geom.options.seriesField);
            }
            else if (geom.options.groupField) {
                _this.multipleLegendFilter(index, geom.options.groupField);
            }
            else {
                _this.legendFilter(index);
            }
        });
    };
    GroupedColumnLineLayer.prototype.getValueByGroupField = function () {
        var _a = this.options, columnGroupField = _a.columnGroupField, data = _a.data;
        var columnData = data[0];
        var values = [];
        each(columnData, function (d) {
            var v = d[columnGroupField];
            if (!contains(values, v)) {
                values.push(v);
            }
        });
        return values;
    };
    GroupedColumnLineLayer.prototype.getMockData = function (index) {
        var _a = this.options, xField = _a.xField, yField = _a.yField, columnGroupField = _a.columnGroupField;
        var mockA = {};
        mockA[xField] = 'null_1';
        mockA[yField[index]] = 0;
        mockA[columnGroupField] = 'null_a';
        var mockB = {};
        mockB[xField] = 'null_1';
        mockB[yField[index]] = 1;
        mockB[columnGroupField] = 'null_a';
        return [mockA, mockB];
    };
    return GroupedColumnLineLayer;
}(ColumnLineLayer));
export default GroupedColumnLineLayer;
registerPlotType('groupedColumnLine', GroupedColumnLineLayer);
//# sourceMappingURL=layer.js.map