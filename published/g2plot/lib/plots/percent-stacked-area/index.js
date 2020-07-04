"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var plot_1 = tslib_1.__importDefault(require("../../base/plot"));
var layer_1 = tslib_1.__importDefault(require("./layer"));
var PercentStackedArea = /** @class */ (function (_super) {
    tslib_1.__extends(PercentStackedArea, _super);
    function PercentStackedArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PercentStackedArea.prototype.createLayers = function (props) {
        var layerProps = util_1.deepMix({}, props);
        layerProps.type = 'percentStackedArea';
        _super.prototype.createLayers.call(this, layerProps);
    };
    PercentStackedArea.getDefaultOptions = layer_1.default.getDefaultOptions;
    return PercentStackedArea;
}(plot_1.default));
exports.default = PercentStackedArea;
//# sourceMappingURL=index.js.map