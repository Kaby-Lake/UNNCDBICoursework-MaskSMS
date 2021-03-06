"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var g_canvas_1 = require("@antv/g-canvas");
exports.Canvas = g_canvas_1.Canvas;
var g_svg_1 = require("@antv/g-svg");
exports.SVG = g_svg_1.Canvas;
// G2
var g2_1 = require("@antv/g2");
exports.View = g2_1.View;
exports.registerAnimation = g2_1.registerAnimation;
exports.registerGeometry = g2_1.registerGeometry;
exports.Geometry = g2_1.Geometry;
exports.Interaction = g2_1.Interaction;
exports.registerInteraction = g2_1.registerInteraction;
exports.registerShape = g2_1.registerShape;
exports.getTheme = g2_1.getTheme;
exports.Util = g2_1.Util;
exports.getShapeFactory = g2_1.getShapeFactory;
exports.registerComponentController = g2_1.registerComponentController;
var constant_1 = require("@antv/g2/lib/constant");
exports.VIEW_LIFE_CIRCLE = constant_1.VIEW_LIFE_CIRCLE;
exports.COMPONENT_TYPE = constant_1.COMPONENT_TYPE;
exports.FIELD_ORIGIN = constant_1.FIELD_ORIGIN;
var gesture_1 = tslib_1.__importDefault(require("@antv/g2/lib/chart/controller/gesture"));
exports.Gesture = gesture_1.default;
var marker_1 = require("@antv/g2/lib/util/marker");
exports.MarkerSymbols = marker_1.MarkerSymbols;
var animate_1 = require("@antv/g2/lib/animate");
exports.DEFAULT_ANIMATE_CFG = animate_1.DEFAULT_ANIMATE_CFG;
exports.getDefaultAnimateCfg = animate_1.getDefaultAnimateCfg;
exports.doAnimate = animate_1.doAnimate;
var element_1 = require("@antv/g2/lib/geometry/element");
exports.Element = element_1.default;
// Component
var html_1 = tslib_1.__importDefault(require("@antv/component/lib/tooltip/html"));
exports.HtmlTooltip = html_1.default;
var html_theme_1 = tslib_1.__importDefault(require("@antv/component/lib/tooltip/html-theme"));
exports.HtmlTooltipTheme = html_theme_1.default;
var TooltipCssConst = tslib_1.__importStar(require("@antv/component/lib/tooltip/css-const"));
exports.TooltipCssConst = TooltipCssConst;
var component_1 = require("@antv/component");
exports.GroupComponent = component_1.GroupComponent;
exports.Axis = component_1.Axis;
exports.Legend = component_1.Legend;
exports.Tooltip = component_1.Tooltip;
exports.Slider = component_1.Slider;
exports.Scrollbar = component_1.Scrollbar;
// Coordinate
var coord_1 = require("@antv/coord");
exports.Coordinate = coord_1.Coordinate;
// Common
exports.ORIGIN = 'origin';
exports._ORIGIN = '_origin';
//# sourceMappingURL=dependents.js.map