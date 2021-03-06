"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var scale_1 = require("@antv/scale");
var description_1 = tslib_1.__importDefault(require("../components/description"));
var bbox_1 = tslib_1.__importDefault(require("../util/bbox"));
var layer_1 = tslib_1.__importDefault(require("../base/layer"));
var common_1 = require("../util/common");
var theme_1 = tslib_1.__importDefault(require("../base/controller/theme"));
var theme_2 = require("../theme");
var LEGEND_MARGIN = 5;
var ComboViewLayer = /** @class */ (function (_super) {
    tslib_1.__extends(ComboViewLayer, _super);
    function ComboViewLayer(props) {
        var _this = _super.call(this, props) || this;
        _this.geomLayers = [];
        _this.legends = [];
        _this.requiredField = ['xField', 'yField'];
        _this.options = _this.getOptions(props);
        _this.initialOptions = util_1.deepMix({}, props);
        _this.themeController = new theme_1.default();
        return _this;
    }
    ComboViewLayer.getDefaultOptions = function () {
        return {
            title: {
                visible: false,
                alignTo: 'left',
                text: '',
            },
            description: {
                visible: false,
                text: '',
                alignTo: 'left',
            },
        };
    };
    ComboViewLayer.prototype.getOptions = function (props) {
        var curOptions = this.options || {};
        var options = _super.prototype.getOptions.call(this, props);
        // @ts-ignore
        var defaultOptions = this.constructor.getDefaultOptions(props);
        return util_1.deepMix({}, options, defaultOptions, curOptions, props);
    };
    ComboViewLayer.prototype.checkData = function () {
        var _this = this;
        var _a, _b;
        var _c = this.options, data = _c.data, xField = _c.xField, yField = _c.yField;
        // 判断1: 没有配置必选字段时不绘制
        for (var i = 0; i < this.requiredField.length; i++) {
            var field = this.requiredField[i];
            if (!util_1.hasKey(this.options, field)) {
                return false;
            }
        }
        // 判断2: yField不是数组或只设置了一个字段时不绘制
        if (!util_1.isArray(yField) || yField.length < 2) {
            return false;
        }
        // 判断3:data为空时不绘制 data:[]
        if (!util_1.isArray(data) || data.length === 0) {
            return false;
        }
        // 判断4: 内嵌两层空数据时不绘制 data:[[],[]]
        if (((_a = data[0]) === null || _a === void 0 ? void 0 : _a.length) === 0 && ((_b = data[1]) === null || _b === void 0 ? void 0 : _b.length) === 0) {
            return false;
        }
        // 判断5：一层数据为空时，利用相关映射字段补齐数据 data:[[],[{type:'a',value:10}]
        util_1.each(data, function (d, index) {
            if (!util_1.isArray(d) || d.length === 0) {
                var mockData = _this.getMockData(index);
                data[index] = mockData;
            }
        });
        // 判断6: 两份数据xField或值不一致时不绘制
        if (!data[0][0][xField] || !data[1][0][xField]) {
            return false;
        }
        return true;
    };
    ComboViewLayer.prototype.init = function () {
        _super.prototype.init.call(this);
        this.theme = this.themeController.getTheme(this.options, this.type);
        this.drawTitle();
        this.drawDescription();
    };
    ComboViewLayer.prototype.updateConfig = function (cfg) {
        this.doDestroy();
        this.options = this.getOptions(cfg);
        this.processOptions(this.options);
    };
    ComboViewLayer.prototype.changeData = function (data) {
        if ((data && data.length < 2) || !util_1.isArray(data[0])) {
            return;
        }
        util_1.each(this.geomLayers, function (layer, index) {
            layer.changeData(data[index]);
        });
    };
    ComboViewLayer.prototype.changeDataByIndex = function (data, index) {
        if (util_1.isArray(data[0])) {
            return;
        }
        var geomLayer = this.geomLayers[index];
        geomLayer.changeData(data);
    };
    ComboViewLayer.prototype.doDestroy = function () {
        util_1.each(this.geomLayers, function (layer) {
            layer.doDestroy();
        });
        this.geomLayers = [];
        util_1.each(this.legends, function (legend) {
            legend.destroy();
        });
        this.legends = [];
    };
    ComboViewLayer.prototype.createLayer = function (LayerCtr, data, config) {
        var viewRange = this.getViewRange();
        var layer = new LayerCtr(tslib_1.__assign({ canvas: this.canvas, container: this.container, x: viewRange.minX, y: viewRange.minY, width: viewRange.width, height: viewRange.height, data: data }, config));
        this.geomLayers.push(layer);
        return layer;
    };
    ComboViewLayer.prototype.yAxis = function (index) {
        var yAxis = this.options.yAxis;
        var config = index === 0 ? yAxis.leftConfig : yAxis.rightConfig;
        var colorValue = this.colors[index];
        var yAxisConfig = util_1.clone(config);
        var styleMap = {
            title: 'stroke',
            line: 'stroke',
            label: 'fill',
            tickLine: 'stroke',
        };
        if (config.visible && config.colorMapping) {
            util_1.each(yAxisConfig, function (config, name) {
                if (!util_1.isString(config) && util_1.hasKey(styleMap, name)) {
                    var styleKey = styleMap[name];
                    if (!config.style) {
                        config.style = {};
                    }
                    config.style[styleKey] = colorValue;
                }
            });
        }
        if (!config.visible) {
            yAxisConfig.title.visible = false;
            yAxisConfig.tickLine.visible = false;
            yAxisConfig.label.visible = false;
            yAxisConfig.line.visible = false;
            yAxisConfig.visible = true;
        }
        var yAxisGlobalConfig = this.getYAxisGlobalConfig();
        return util_1.deepMix({}, yAxisGlobalConfig, yAxisConfig);
    };
    ComboViewLayer.prototype.getTicks = function () {
        var yAxis = this.options.yAxis;
        var leftScaleData = this.getScaleData(0);
        // 取到左轴ticks数量
        var Scale = scale_1.getScale('linear');
        var linearScale = new Scale(util_1.deepMix({}, {
            min: 0,
            max: leftScaleData.max,
            nice: true,
            values: leftScaleData.values,
        }, {
            tickCount: yAxis.tickCount,
        }));
        var tickCount = linearScale.ticks.length;
        // 生成右轴ticks
        var max = yAxis.max ? linearScale.max : this.getScaleData(1).max;
        var tickInterval = max / (tickCount - 1);
        var ticks = [];
        for (var i = 0; i < tickCount; i++) {
            var tickValue = i * tickInterval;
            if (!Number.isInteger(tickValue)) {
                tickValue = parseFloat(tickValue.toFixed(1));
            }
            ticks.push(tickValue);
        }
        return ticks;
    };
    ComboViewLayer.prototype.getScaleData = function (index) {
        var _a = this.options, data = _a.data, yField = _a.yField, yAxis = _a.yAxis;
        var values = [];
        util_1.each(data[index], function (d) {
            values.push(d[yField[index]]);
        });
        values.sort(function (a, b) { return a - b; });
        var min = values[0];
        var max = yAxis.max ? yAxis.max : values[values.length - 1];
        return { min: min, max: max, values: values };
    };
    ComboViewLayer.prototype.getDataByXField = function (value, index) {
        var _a = this.options, data = _a.data, xField = _a.xField;
        var dataSource = data[index];
        return dataSource.filter(function (d) {
            return d[xField] === value;
        });
    };
    ComboViewLayer.prototype.getYAxisGlobalConfig = function () {
        var _a = this.options.yAxis, min = _a.min, max = _a.max, tickCount = _a.tickCount;
        return { min: min, max: max, tickCount: tickCount };
    };
    ComboViewLayer.prototype.adjustLayout = function () {
        var _this = this;
        var _a, _b;
        var bleeding = theme_2.getGlobalTheme().bleeding;
        if (util_1.isArray(bleeding)) {
            util_1.each(bleeding, function (it, index) {
                if (typeof bleeding[index] === 'function') {
                    bleeding[index] = bleeding[index](_this.options);
                }
            });
        }
        var viewRange = this.getViewRange();
        var leftPadding = this.geomLayers[0].options.padding;
        var rightPadding = this.geomLayers[1].options.padding;
        // 获取legendHeight并加入上部padding
        var legendHeight = 0;
        var legendABBox;
        var legendBBBox;
        if ((_a = this.options.legend) === null || _a === void 0 ? void 0 : _a.visible) {
            legendABBox = this.legends[0].getLayoutBBox();
            legendBBBox = this.legends[1].getLayoutBBox();
            legendHeight = legendABBox.height + LEGEND_MARGIN * 2;
        }
        // 同步左右padding
        var uniquePadding = [leftPadding[0] + legendHeight, rightPadding[1], rightPadding[2], leftPadding[3]];
        this.geomLayers[0].updateConfig({
            padding: uniquePadding,
        });
        this.geomLayers[0].render();
        this.geomLayers[1].updateConfig({
            padding: uniquePadding,
        });
        this.geomLayers[1].render();
        // 更新legend的位置
        if ((_b = this.options.legend) === null || _b === void 0 ? void 0 : _b.visible) {
            this.legends[0].setLocation({
                x: bleeding[3],
                y: viewRange.minY + LEGEND_MARGIN,
            });
            this.legends[1].setLocation({
                x: viewRange.maxX - bleeding[1] - legendBBBox.width,
                y: viewRange.minY + LEGEND_MARGIN,
            });
        }
    };
    ComboViewLayer.prototype.legendFilter = function (index) {
        var _this = this;
        var legend = this.legends[index];
        var legend_group = legend.get('group');
        legend_group.on('click', function () {
            var item = legend.get('items')[0];
            if (!item.unchecked) {
                legend.setItemState(item, 'unchecked', true);
                _this.hideLayer(index);
            }
            else {
                legend.setItemState(item, 'unchecked', false);
                _this.showLayer(index);
            }
        });
    };
    ComboViewLayer.prototype.hideLayer = function (index) {
        var layer = this.geomLayers[index];
        var field = this.options.yField[index];
        // 隐藏layer时只隐藏yAxis和geometry
        var view = layer.view;
        var axisContainer = this.getYAxisContainer(view, field);
        if (axisContainer) {
            axisContainer.set('visible', false);
        }
        this.setGeometryVisibility(view, false);
        this.canvas.draw();
    };
    ComboViewLayer.prototype.showLayer = function (index) {
        var layer = this.geomLayers[index];
        var field = this.options.yField[index];
        var view = layer.view;
        var axisContainer = this.getYAxisContainer(view, field);
        if (axisContainer) {
            axisContainer.set('visible', true);
        }
        this.setGeometryVisibility(view, true);
        this.canvas.draw();
    };
    ComboViewLayer.prototype.setGeometryVisibility = function (view, show) {
        util_1.each(view.geometries, function (geom) {
            var container = geom.container, labelsContainer = geom.labelsContainer;
            if (container) {
                container.set('visible', show);
            }
            if (labelsContainer) {
                labelsContainer.set('visible', show);
            }
        });
    };
    ComboViewLayer.prototype.getYAxisContainer = function (view, field) {
        var container;
        var axisCtr = view.controllers.filter(function (ctr) {
            return util_1.hasKey(ctr, 'axisContainer');
        })[0];
        if (axisCtr) {
            var ctr = axisCtr;
            var axisGroups = ctr.axisContainer.get('children');
            util_1.each(axisGroups, function (g) {
                var axisField = g.get('component').get('field');
                if (axisField === field) {
                    container = g;
                }
            });
        }
        return container;
    };
    ComboViewLayer.prototype.getUnCheckedValue = function () {
        var value = [];
        util_1.each(this.legends, function (legend) {
            var uncheckedItems = legend.getItemsByState('unchecked');
            util_1.each(uncheckedItems, function (item) {
                value.push(item.name);
            });
        });
        return value;
    };
    ComboViewLayer.prototype.drawTitle = function () {
        var props = this.options;
        var range = this.layerBBox;
        if (this.title) {
            this.title.destroy();
            this.title = null;
        }
        if (common_1.isTextUsable(props.title)) {
            var width = this.width;
            var theme = this.theme;
            var title = new description_1.default({
                leftMargin: range.minX + theme.title.padding[3],
                rightMargin: range.maxX - theme.title.padding[1],
                topMargin: range.minY + theme.title.padding[0],
                text: props.title.text,
                style: util_1.mix(theme.title, props.title.style),
                wrapperWidth: width - theme.title.padding[3] - theme.title.padding[1],
                container: this.container.addGroup(),
                theme: theme,
                index: common_1.isTextUsable(props.description) ? 0 : 1,
                plot: this,
                alignTo: props.title.alignTo,
                name: 'title',
            });
            this.title = title;
        }
    };
    ComboViewLayer.prototype.drawDescription = function () {
        var props = this.options;
        var range = this.layerBBox;
        if (this.description) {
            this.description.destroy();
            this.description = null;
        }
        if (common_1.isTextUsable(props.description)) {
            var width = this.width;
            var theme = this.theme;
            var topMargin = 0;
            if (this.title) {
                var titleBBox = this.title.getBBox();
                topMargin += titleBBox.minY + titleBBox.height;
                topMargin += theme.description.padding[0];
            }
            else {
                // 无title的情况下使用title的上padding
                topMargin += range.minY + theme.title.padding[0];
            }
            var description = new description_1.default({
                leftMargin: range.minX + theme.description.padding[3],
                topMargin: topMargin,
                rightMargin: range.maxX - theme.title.padding[1],
                text: props.description.text,
                style: util_1.mix(theme.description, props.description.style),
                wrapperWidth: width - theme.description.padding[3] - theme.description.padding[1],
                container: this.container.addGroup(),
                theme: theme,
                index: 1,
                plot: this,
                alignTo: props.description.alignTo,
                name: 'description',
            });
            this.description = description;
        }
    };
    ComboViewLayer.prototype.getViewRange = function () {
        if (!this.layerBBox) {
            this.layerBBox = new bbox_1.default(this.x, this.y, this.width, this.height);
        }
        var viewMinX = this.layerBBox.minX;
        var viewMaxX = this.layerBBox.maxX;
        var viewMinY = this.layerBBox.minY;
        var viewMaxY = this.layerBBox.maxY;
        var components = [this.title, this.description];
        util_1.each(components, function (component) {
            if (component) {
                var position = component.position;
                var _a = component.getBBox(), minX = _a.minX, maxX = _a.maxX, minY = _a.minY, maxY = _a.maxY;
                if (maxY >= viewMinY && maxY <= viewMaxY && position === 'top') {
                    viewMinY = maxY;
                }
                if (minY >= viewMinY && minY <= viewMaxY && position === 'bottom') {
                    viewMaxY = minY;
                }
                if (maxX > viewMinX && maxX <= viewMaxX && position === 'left') {
                    viewMinX = maxX;
                }
                if (minX >= viewMinX && maxX <= viewMaxX && position === 'right') {
                    viewMaxX = minX;
                }
            }
        });
        return new bbox_1.default(viewMinX, viewMinY, viewMaxX - viewMinX, viewMaxY - viewMinY);
    };
    ComboViewLayer.prototype.getMockData = function (index) {
        var _a = this.options, xField = _a.xField, yField = _a.yField;
        var mock = {};
        mock[xField] = 'null';
        mock[yField[index]] = 0;
        return [mock];
    };
    return ComboViewLayer;
}(layer_1.default));
exports.default = ComboViewLayer;
//# sourceMappingURL=base.js.map