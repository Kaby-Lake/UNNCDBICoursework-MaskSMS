"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var component_1 = require("@antv/component");
var global_1 = require("../../base/global");
var base_1 = tslib_1.__importDefault(require("../base"));
var layer_1 = tslib_1.__importDefault(require("../../plots/line/layer"));
var util_1 = require("@antv/util");
var defaultLineConfig = {
    lineSize: 2,
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
var DualLineLayer = /** @class */ (function (_super) {
    tslib_1.__extends(DualLineLayer, _super);
    function DualLineLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'dualLine';
        return _this;
    }
    DualLineLayer.getDefaultOptions = function () {
        return util_1.deepMix({}, _super.getDefaultOptions.call(this), {
            legend: {
                visible: true,
            },
            yAxis: {
                leftConfig: defaultYAxisConfig,
                rightConfig: defaultYAxisConfig,
            },
            // 自古红蓝出cp....
            lineConfigs: [
                util_1.deepMix({}, defaultLineConfig, { color: '#5B8FF9' }),
                util_1.deepMix({}, defaultLineConfig, { color: '#e76c5e' }),
            ],
        });
    };
    DualLineLayer.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        if (!this.checkData()) {
            return;
        }
        var _a = this.options, data = _a.data, meta = _a.meta, xField = _a.xField, yField = _a.yField, xAxis = _a.xAxis, tooltip = _a.tooltip, lineConfigs = _a.lineConfigs, legend = _a.legend, events = _a.events;
        this.colors = [lineConfigs[0].color, lineConfigs[1].color];
        var yAxisGlobalConfig = this.getYAxisGlobalConfig();
        //draw first line
        var leftLine = this.createLayer(layer_1.default, data[0], tslib_1.__assign({ meta: meta,
            xField: xField, yField: yField[0], xAxis: {
                visible: false,
            }, yAxis: util_1.deepMix({}, yAxisGlobalConfig, this.yAxis(0), {
                grid: {
                    visible: false,
                },
                nice: true,
            }), tooltip: {
                visible: false,
            }, events: events }, lineConfigs[0]));
        leftLine.render();
        //draw second line
        var metaInfo = {};
        metaInfo[yField[1]] = { ticks: this.getTicks() };
        var rightLine = this.createLayer(layer_1.default, data[1], tslib_1.__assign({ xField: xField, yField: yField[1], meta: util_1.deepMix({}, meta, metaInfo), serieField: yField[1], xAxis: xAxis, yAxis: util_1.deepMix({}, yAxisGlobalConfig, this.yAxis(1), {
                position: 'right',
                nice: false,
            }), tooltip: util_1.deepMix({}, tooltip, {
                showMarkers: false,
                custom: {
                    onChange: function (containerDom, ev) {
                        _this.tooltip(containerDom, ev);
                    },
                },
            }), events: events }, lineConfigs[1]));
        rightLine.render();
        if (legend.visible) {
            this.customLegend();
        }
        this.adjustLayout();
    };
    DualLineLayer.prototype.tooltip = function (dom, ev) {
        var unCheckedValue = this.getUnCheckedValue();
        // 如果legend全部是unchecked的状态，tooltip不显示
        if (unCheckedValue.length === this.colors.length) {
            dom.style.display = 'none';
            return;
        }
        else {
            dom.style.display = 'block';
        }
        var _a = this.options, yField = _a.yField, legend = _a.legend;
        var originItem = util_1.clone(ev.items[0]);
        var dataItemsA = this.getDataByXField(ev.title, 0)[0];
        if (dataItemsA) {
            ev.items.push(tslib_1.__assign(tslib_1.__assign({}, originItem), { mappingData: util_1.deepMix({}, originItem.mappingData, { _origin: dataItemsA }), data: dataItemsA, name: yField[0], value: dataItemsA[yField[0]], color: this.colors[0] }));
        }
        if (legend.visible) {
            util_1.each(this.legends, function (legend, index) {
                var item = legend.get('items')[0];
                if (item.unchecked) {
                    var spliceIndex = index === 0 ? 1 : 0;
                    ev.items.splice(spliceIndex, 1);
                }
            });
        }
    };
    DualLineLayer.prototype.customLegend = function () {
        var _this = this;
        var _a = this.options, yField = _a.yField, legend = _a.legend;
        var colors = this.colors;
        var container = this.container.addGroup();
        var legendCfg = legend;
        util_1.each(this.geomLayers, function (line, index) {
            var markerCfg = util_1.deepMix({}, {
                symbol: 'circle',
                style: {
                    r: 4,
                    fill: colors[index],
                },
            }, legendCfg.marker);
            var items = [
                {
                    name: yField[index],
                    unchecked: false,
                    marker: markerCfg,
                },
            ];
            var legend = new component_1.Legend.Category({
                id: _this.type,
                container: container,
                x: 0,
                y: 0,
                items: items,
                updateAutoRender: true,
                itemBackground: null,
                itemName: legendCfg.text,
            });
            legend.init();
            legend.render();
            _this.legends.push(legend);
        });
        // 使用legend做图层筛选
        util_1.each(this.geomLayers, function (line, index) {
            _this.legendFilter(index);
        });
    };
    return DualLineLayer;
}(base_1.default));
exports.default = DualLineLayer;
global_1.registerPlotType('dualLine', DualLineLayer);
//# sourceMappingURL=layer.js.map