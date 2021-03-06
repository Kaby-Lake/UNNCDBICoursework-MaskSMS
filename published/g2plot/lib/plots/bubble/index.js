"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var plot_1 = tslib_1.__importDefault(require("../../base/plot"));
var layer_1 = tslib_1.__importDefault(require("./layer"));
var Bubble = /** @class */ (function (_super) {
    tslib_1.__extends(Bubble, _super);
    function Bubble() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bubble.prototype.createLayers = function (props) {
        var layerProps = util_1.deepMix({}, props);
        layerProps.type = 'bubble';
        _super.prototype.createLayers.call(this, layerProps);
    };
    Bubble.getDefaultOptions = layer_1.default.getDefaultOptions;
    return Bubble;
}(plot_1.default));
exports.default = Bubble;
//# sourceMappingURL=index.js.map