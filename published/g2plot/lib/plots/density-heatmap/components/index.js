"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var background_1 = tslib_1.__importDefault(require("./background"));
var legend_1 = tslib_1.__importDefault(require("./legend"));
var ComponentsInfo = {
    background: { Ctr: background_1.default },
    legend: { Ctr: legend_1.default, padding: 'outer' },
};
function getPlotComponents(plot, type, cfg) {
    if (plot.options[type] && plot.options[type].visible) {
        var componentInfo = ComponentsInfo[type];
        var component = new componentInfo.Ctr(cfg);
        if (componentInfo.padding) {
            plot.paddingController.registerPadding(component, componentInfo.padding);
        }
        return component;
    }
}
exports.getPlotComponents = getPlotComponents;
//# sourceMappingURL=index.js.map