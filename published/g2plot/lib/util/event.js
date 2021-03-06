"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("@antv/util");
var eventNames = [
    'click',
    'dblclick',
    'mousemove',
    'mouseenter',
    'mouseleave',
    'mousedown',
    'mouseup',
    'contextmenu',
];
var mobileEventNames = [
/*'touchstart',
'touchmove',
'touchend',
'pressstart',
'press',
'pressend',
'swipestart',
'swipe',
'swipeend',
'pinchstart',
'pinch',
'pinchend',
'panstart',
'pan',
'panend',*/
];
var viewComponentMap = {
    axis: 'axis-label',
    label: 'label',
    legend: 'legend-item',
};
var canvasComponentMap = {
    title: 'title',
    description: 'description',
    breadcrumb: 'breadcrumb',
};
var CANVAS_EVENT_MAP = util_1.deepMix(getEventMap(canvasComponentMap), getRegionEventMap('Plot', eventNames));
exports.CANVAS_EVENT_MAP = CANVAS_EVENT_MAP;
var LAYER_EVENT_MAP = getRegionEventMap('Layer', eventNames);
exports.LAYER_EVENT_MAP = LAYER_EVENT_MAP;
//移动端事件暂时只支持view级
var EVENT_MAP = util_1.deepMix({}, getEventMap(viewComponentMap), getRegionEventMap('View', eventNames), getMobileEventMap());
exports.EVENT_MAP = EVENT_MAP;
function onEvent(layer, eventName, handler) {
    layer.view.on(eventName, function (ev) {
        var eventData = {
            x: ev === null || ev === void 0 ? void 0 : ev.x,
            y: ev === null || ev === void 0 ? void 0 : ev.y,
            clientX: ev === null || ev === void 0 ? void 0 : ev.clientX,
            clientY: ev === null || ev === void 0 ? void 0 : ev.clientY,
            target: ev === null || ev === void 0 ? void 0 : ev.target,
            data: (ev === null || ev === void 0 ? void 0 : ev.data) ? ev.data.data : null,
            plot: layer,
            canvas: layer.canvas,
            gEvent: ev === null || ev === void 0 ? void 0 : ev.gEvent,
        };
        handler(eventData);
    });
}
exports.onEvent = onEvent;
function getEventMap(map) {
    var eventMap = {};
    util_1.each(map, function (item, key) {
        var componentName = util_1.upperFirst(key);
        var namePrefix = "on" + componentName;
        var eventPrefix = item + ":";
        util_1.each(eventNames, function (name) {
            var eventName = util_1.upperFirst(name);
            var eventKey = "" + namePrefix + eventName;
            var event = "" + eventPrefix + name;
            eventMap[eventKey] = event;
        });
    });
    return eventMap;
}
exports.getEventMap = getEventMap;
function getRegionEventMap(prefix, eventList) {
    var eventMap = {};
    var namePrefix = "on";
    util_1.each(eventList, function (name) {
        var eventName = util_1.upperFirst(name);
        var eventKey = "" + namePrefix + prefix + eventName;
        eventMap[eventKey] = name;
    });
    return eventMap;
}
exports.getRegionEventMap = getRegionEventMap;
function getMobileEventMap() {
    var eventMap = {};
    var namePrefix = "on";
    util_1.each(mobileEventNames, function (name) {
        var eventName = util_1.upperFirst(name);
        var eventKey = "" + namePrefix + eventName;
        eventMap[eventKey] = name;
    });
    return eventMap;
}
exports.getMobileEventMap = getMobileEventMap;
//# sourceMappingURL=event.js.map