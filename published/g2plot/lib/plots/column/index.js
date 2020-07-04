"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var plot_1 = tslib_1.__importDefault(require("../../base/plot"));
var layer_1 = tslib_1.__importDefault(require("./layer"));
var Column = /** @class */ (function (_super) {
    tslib_1.__extends(Column, _super);
    function Column() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Column.prototype.createLayers = function (props) {
        var layerProps = util_1.deepMix({}, props);
        layerProps.type = 'column';
        _super.prototype.createLayers.call(this, layerProps);
    };
    Column.getDefaultOptions = layer_1.default.getDefaultOptions;
    return Column;
}(plot_1.default));
exports.default = Column;
//# sourceMappingURL=index.js.map