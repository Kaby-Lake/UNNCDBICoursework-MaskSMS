"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var component_1 = require("@antv/component");
var global_1 = require("../../base/global");
var base_1 = tslib_1.__importDefault(require("../base"));
var layer_1 = tslib_1.__importDefault(require("../../plots/line/layer"));
var layer_2 = tslib_1.__importDefault(require("../../plots/column/layer"));
var util_1 = require("@antv/util");
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
    color: '#5B8FF9',
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
var ColumnLineLayer = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnLineLayer, _super);
    function ColumnLineLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'columnLine';
        _this.legends = [];
        return _this;
    }
    ColumnLineLayer.getDefaultOptions = function () {
        return util_1.deepMix({}, _super.getDefaultOptions.call(this), {
            yAxis: {
                leftConfig: defaultYAxisConfig,
                rightConfig: defaultYAxisConfig,
            },
            lineConfig: defaultLineConfig,
            columnConfig: defaultColumnConfig,
            legend: {
                visible: true,
            },
        });
    };
    ColumnLineLayer.prototype.beforeInit = function () {
        var _a, _b;
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
                util_1.each(seriesValue, function (v, index) {
                    colorPlates_1.push(colorSeries_1[index + 1]);
                });
                options.lineConfig.color = colorPlates_1;
            }
        }
    };
    ColumnLineLayer.prototype.init = function () {
        _super.prototype.init.call(this);
        if (!this.checkData()) {
            return;
        }
        var _a = this.options, data = _a.data, meta = _a.meta, xField = _a.xField, yField = _a.yField, lineSeriesField = _a.lineSeriesField, legend = _a.legend, lineConfig = _a.lineConfig, columnConfig = _a.columnConfig, events = _a.events;
        this.colors = [columnConfig.color, lineConfig.color];
        // draw column
        this.drawColumn();
        //draw line
        var metaInfo = {};
        metaInfo[yField[1]] = { ticks: this.getTicks() };
        var line = this.createLayer(layer_1.default, data[1], tslib_1.__assign({ xField: xField, yField: yField[1], seriesField: lineSeriesField, meta: util_1.deepMix({}, meta, metaInfo), xAxis: {
                visible: false,
            }, yAxis: util_1.deepMix({}, this.yAxis(1), {
                position: 'right',
                grid: {
                    visible: false,
                },
                nice: true,
            }), tooltip: {
                visible: false,
            }, legend: {
                visible: false,
            }, events: events }, lineConfig));
        line.render();
        if (legend.visible) {
            this.customLegend();
        }
        this.adjustLayout();
    };
    ColumnLineLayer.prototype.drawColumn = function () {
        var _this = this;
        var _a = this.options, data = _a.data, xField = _a.xField, yField = _a.yField, xAxis = _a.xAxis, tooltip = _a.tooltip, columnConfig = _a.columnConfig, meta = _a.meta, events = _a.events;
        var column = this.createLayer(layer_2.default, data[0], tslib_1.__assign({ xField: xField, yField: yField[0], meta: meta,
            xAxis: xAxis, yAxis: util_1.deepMix({}, this.yAxis(0), {
                grid: {
                    visible: true,
                },
                nice: true,
            }), tooltip: util_1.deepMix({}, tooltip, {
                showMarkers: false,
                custom: {
                    onChange: function (containerDom, ev) {
                        _this.tooltip(containerDom, ev);
                    },
                },
            }), events: events }, columnConfig));
        column.render();
    };
    ColumnLineLayer.prototype.tooltip = function (dom, ev) {
        var _this = this;
        var yField = this.options.yField;
        var originItem = util_1.clone(ev.items[0]);
        var dataItemsA = this.getDataByXField(ev.title, 1);
        if (dataItemsA) {
            util_1.each(dataItemsA, function (d, index) {
                var seriesField = _this.geomLayers[1].options.seriesField;
                var name = seriesField ? d[seriesField] : yField[1];
                ev.items.push(tslib_1.__assign(tslib_1.__assign({}, originItem), { mappingData: util_1.deepMix({}, originItem.mappingData, { _origin: dataItemsA }), data: d, name: name, value: d[yField[1]], color: util_1.isArray(_this.colors[1]) ? _this.colors[1][index] : _this.colors[1] }));
            });
        }
        if (this.options.legend.visible) {
            var unCheckedValue_1 = this.getUnCheckedValue();
            var totalItems = this.legends[0].get('items').length + this.legends[1].get('items').length;
            // 如果legend全部是unchecked的状态，tooltip不显示
            if (unCheckedValue_1.length === totalItems) {
                dom.style.display = 'none';
                return;
            }
            else {
                dom.style.display = 'block';
            }
            // legend部分checked的时候，根据checked状态filter items
            var uniqKeys_1 = [];
            var uniqItems_1 = [];
            util_1.each(ev.items, function (item) {
                var name = item.name;
                if (!util_1.contains(uniqKeys_1, name) && !util_1.contains(unCheckedValue_1, name)) {
                    uniqKeys_1.push(name);
                    uniqItems_1.push(item);
                }
            });
            util_1.each(ev.items, function (item, index) {
                if (index < uniqItems_1.length) {
                    ev.items[index] = uniqItems_1[index];
                }
                else {
                    ev.items.pop();
                }
            });
        }
    };
    ColumnLineLayer.prototype.customLegend = function () {
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
            else {
                _this.legendFilter(index);
            }
        });
    };
    ColumnLineLayer.prototype.createSingleLegend = function (name, symbol, color, cfg, container) {
        var markerCfg = util_1.deepMix({}, {
            symbol: symbol,
            style: {
                r: 4,
                fill: color,
            },
        }, cfg.marker);
        var items = [
            {
                name: name,
                unchecked: false,
                marker: markerCfg,
            },
        ];
        var legend = new component_1.Legend.Category({
            id: this.type,
            container: container,
            x: 0,
            y: 0,
            items: items,
            updateAutoRender: true,
            itemBackground: null,
            itemName: cfg.text,
        });
        legend.init();
        legend.render();
        return legend;
    };
    ColumnLineLayer.prototype.createNormalLegend = function (values, symbol, color, cfg, container) {
        var legendItems = [];
        util_1.each(values, function (v, index) {
            legendItems.push({
                name: v,
                unchecked: false,
                marker: {
                    symbol: symbol,
                    style: {
                        r: 4,
                        fill: color[index],
                    },
                },
            });
        });
        var legend = new component_1.Legend.Category({
            id: this.type,
            container: container,
            x: 0,
            y: 0,
            items: legendItems,
            updateAutoRender: true,
            itemBackground: null,
            itemName: cfg.text,
            offsetX: 0,
        });
        legend.init();
        legend.render();
        return legend;
    };
    ColumnLineLayer.prototype.multipleLegendFilter = function (index, field) {
        var _this = this;
        var legend = this.legends[index];
        var filteredValue = [];
        var legend_group = legend.get('group');
        var layerHide = false;
        legend_group.on('click', function (ev) {
            var view = _this.geomLayers[index].view;
            var item = ev.target.get('delegateObject').item;
            if (item.unchecked) {
                if (layerHide === true) {
                    _this.showLayer(index);
                    layerHide = false;
                }
                util_1.pull(filteredValue, item.name);
                view.filter(item.value, function (f) {
                    return !util_1.contains(filteredValue, f);
                });
                view.render();
                legend.setItemState(item, 'unchecked', false);
            }
            else {
                legend.setItemState(item, 'unchecked', true);
                filteredValue.push(item.name);
                if (filteredValue.length === _this.legends[index].get('items').length) {
                    // 如果分组分类全部被uncheck了，直接隐藏图层，这样仍然可以trigger tooltip
                    _this.hideLayer(index);
                    layerHide = true;
                }
                else {
                    view.filter(field, function (f) {
                        return !util_1.contains(filteredValue, f);
                    });
                    view.render();
                }
            }
            _this.canvas.draw();
        });
    };
    ColumnLineLayer.prototype.getValueBySeriesField = function () {
        var _a = this.options, lineSeriesField = _a.lineSeriesField, data = _a.data;
        var lineData = data[1];
        var values = [];
        util_1.each(lineData, function (d) {
            var v = d[lineSeriesField];
            if (!util_1.contains(values, v)) {
                values.push(v);
            }
        });
        return values;
    };
    return ColumnLineLayer;
}(base_1.default));
exports.default = ColumnLineLayer;
global_1.registerPlotType('columnLine', ColumnLineLayer);
//# sourceMappingURL=layer.js.map