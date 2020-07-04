import { assign } from '@antv/util';
import { getEventMap, EVENT_MAP, onEvent } from '../../util/event';
var componentMap = {
    range: 'point',
    statistic: 'annotation-text',
};
var SHAPE_EVENT_MAP = getEventMap(componentMap);
assign(EVENT_MAP, SHAPE_EVENT_MAP);
export { EVENT_MAP, onEvent };
//# sourceMappingURL=event.js.map