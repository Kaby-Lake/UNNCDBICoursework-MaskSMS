"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dom_util_1 = require("@antv/dom-util");
var util_1 = require("@antv/util");
var global_1 = require("../../base/global");
var layer_1 = tslib_1.__importDefault(require("../pie/layer"));
var EventParser = tslib_1.__importStar(require("./event"));
var ring_statistic_1 = tslib_1.__importDefault(require("./component/ring-statistic"));
var G2_GEOM_MAP = {
    ring: 'interval',
};
var PLOT_GEOM_MAP = {
    interval: 'ring',
};
var DonutLayer = /** @class */ (function (_super) {
    tslib_1.__extends(DonutLayer, _super);
    function DonutLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'donut';
        return _this;
    }
    DonutLayer.getDefaultOptions = function () {
        return util_1.deepMix({}, _super.getDefaultOptions.call(this), {
            radius: 0.8,
            innerRadius: 0.64,
            statistic: {
                visible: true,
                totalLabel: '总计',
                triggerOn: 'mouseenter',
                triggerOff: 'mouseleave',
            },
        });
    };
    DonutLayer.prototype.beforeInit = function () {
        _super.prototype.beforeInit.call(this);
        DonutLayer.centralId++;
        this.statisticClass = "statisticClassId" + DonutLayer.centralId;
        this.adjustLabelDefaultOptions();
        if (this.options.statistic.visible && this.options.statistic.triggerOn) {
            this.options.tooltip.visible = false;
        }
    };
    DonutLayer.prototype.afterRender = function () {
        var container = this.canvas.get('container');
        if (this.statistic) {
            container.removeChild(this.statistic.wrapperNode);
        }
        /**环图中心文本 */
        if (this.options.statistic && this.options.statistic.visible) {
            var container_1 = this.canvas.get('container');
            dom_util_1.modifyCSS(container_1, { position: 'relative' });
            this.statistic = new ring_statistic_1.default(tslib_1.__assign({ container: container_1, view: this.view, plot: this, statisticClass: this.statisticClass }, this.options.statistic));
            this.statistic.render();
            /**响应交互 */
            if (this.options.statistic.triggerOn) {
                this.statistic.triggerOn();
            }
        }
        _super.prototype.afterRender.call(this);
    };
    DonutLayer.prototype.destroy = function () {
        if (this.statistic) {
            this.statistic.destroy();
        }
        _super.prototype.destroy.call(this);
    };
    DonutLayer.prototype.geometryParser = function (dim, type) {
        if (dim === 'g2') {
            return G2_GEOM_MAP[type];
        }
        return PLOT_GEOM_MAP[type];
    };
    DonutLayer.prototype.coord = function () {
        var props = this.options;
        var coordConfig = {
            type: 'theta',
            cfg: {
                radius: props.radius,
                innerRadius: props.innerRadius,
            },
        };
        this.setConfig('coordinate', coordConfig);
    };
    DonutLayer.prototype.parseEvents = function () {
        _super.prototype.parseEvents.call(this, EventParser);
    };
    /** @override 调整 label 默认 options */
    DonutLayer.prototype.adjustLabelDefaultOptions = function () {
        var labelConfig = this.options.label;
        if (labelConfig && labelConfig.type === 'inner') {
            var labelStyleConfig = (labelConfig.style || {});
            if (!labelStyleConfig.textAlign) {
                labelStyleConfig.textAlign = 'center';
            }
            labelConfig.style = labelStyleConfig;
            if (!labelConfig.offset) {
                labelConfig.offset = ((this.options.innerRadius - 1) / 2) * 100 + "%";
            }
        }
    };
    DonutLayer.centralId = 0;
    return DonutLayer;
}(layer_1.default));
exports.default = DonutLayer;
global_1.registerPlotType('donut', DonutLayer);
//# sourceMappingURL=layer.js.map