export { Canvas } from '@antv/g-canvas';
export { Canvas as SVG } from '@antv/g-svg';
// G2
export { View, registerAnimation, registerGeometry, Geometry, Interaction, registerInteraction, registerShape, getTheme, Util, getShapeFactory, registerComponentController, } from '@antv/g2';
export { VIEW_LIFE_CIRCLE, COMPONENT_TYPE, FIELD_ORIGIN } from '@antv/g2/lib/constant';
import Gesture from '@antv/g2/lib/chart/controller/gesture';
export { Gesture };
export { MarkerSymbols } from '@antv/g2/lib/util/marker';
export { DEFAULT_ANIMATE_CFG, getDefaultAnimateCfg, doAnimate } from '@antv/g2/lib/animate';
export { default as Element } from '@antv/g2/lib/geometry/element';
// Component
import HtmlTooltip from '@antv/component/lib/tooltip/html';
import HtmlTooltipTheme from '@antv/component/lib/tooltip/html-theme';
import * as TooltipCssConst from '@antv/component/lib/tooltip/css-const';
export { HtmlTooltip, HtmlTooltipTheme, TooltipCssConst };
export { GroupComponent, Axis, Legend, Tooltip, Slider, Scrollbar } from '@antv/component';
// Coordinate
export { Coordinate } from '@antv/coord';
// Common
export var ORIGIN = 'origin';
export var _ORIGIN = '_origin';
//# sourceMappingURL=dependents.js.map