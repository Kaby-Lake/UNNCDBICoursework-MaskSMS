"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var dependents_1 = require("../../dependents");
var base_1 = tslib_1.__importStar(require("../../components/label/base"));
var PointLabel = /** @class */ (function (_super) {
    tslib_1.__extends(PointLabel, _super);
    function PointLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointLabel.prototype.getDefaultOptions = function () {
        var theme = this.layer.theme;
        var _a = theme.label, label = _a === void 0 ? {} : _a;
        return tslib_1.__assign({ offsetX: 0, offsetY: 0 }, label);
    };
    PointLabel.prototype.getLabelOffset = function () {
        return this.getLabelOffsetByDimAndFactor('y', -1);
    };
    PointLabel.prototype.getLabelItemAttrs = function (element, index) {
        var _this = this;
        var _a = this.options, style = _a.style, formatter = _a.formatter;
        var mappingData = util_1.get(element, 'model.mappingData', []);
        return util_1.map(mappingData, function (datum, datumIndex) {
            var _a;
            var value = _this.getValue(datum);
            return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, _this.getPosition(datum)), { text: formatter
                    ? formatter(value, (_a = {},
                        _a[dependents_1._ORIGIN] = datum._origin,
                        _a.mappingDatum = datum,
                        _a.mappingDatumIndex = datumIndex,
                        _a.element = element,
                        _a.elementIndex = index,
                        _a), index)
                    : value, textAlign: 'center', textBaseline: 'middle' }), style);
        });
    };
    PointLabel.prototype.getValue = function (datum) {
        return util_1.get(datum._origin, this.layer.options.yField);
    };
    PointLabel.prototype.getPosition = function (datum) {
        var pos = {
            x: util_1.isArray(datum.x) ? util_1.last(datum.x) : datum.x,
            y: util_1.isArray(datum.y) ? util_1.last(datum.y) : datum.y,
        };
        return pos;
    };
    PointLabel.prototype.adjustLabel = function () {
        return;
    };
    return PointLabel;
}(base_1.default));
exports.default = PointLabel;
base_1.registerLabelComponent('point', PointLabel);
//# sourceMappingURL=point.js.map