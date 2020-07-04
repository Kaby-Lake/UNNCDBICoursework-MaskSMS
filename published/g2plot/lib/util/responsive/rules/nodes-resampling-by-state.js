"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = require("@antv/util");
var text_hide_1 = tslib_1.__importDefault(require("./text-hide"));
function nodesResamplingByState(shape, option, index, cfg) {
    var nodes = cfg.nodes.nodes;
    var current = nodes[index];
    if (current.line) {
        current.line.remove();
    }
    var data = cfg.plot.initialProps.data;
    var field = cfg.plot[cfg.plot.type].label.fields[0];
    var stateNodes = getStateNodes(data, field, nodes);
    var isState = false;
    util_1.each(stateNodes, function (node) {
        // @ts-ignore
        if (node.shape.get('origin') === current.shape.get('origin')) {
            isState = true;
        }
    });
    if (isState) {
        if (current.origin_position) {
            var _a = current.origin_position, x = _a.x, y = _a.y;
            shape.attr('x', x);
            shape.attr('y', y);
        }
    }
    else {
        text_hide_1.default(shape);
    }
}
exports.default = nodesResamplingByState;
function getStateNodes(data, field, nodes) {
    var extract_data = [];
    util_1.each(data, function (d) {
        extract_data.push(d[field]);
    });
    extract_data.sort(function (a, b) {
        return a - b;
    });
    var min = extract_data[0];
    var min_node = getNodeByNumber(nodes, field, min);
    var max = extract_data[extract_data.length - 1];
    var max_node = getNodeByNumber(nodes, field, max);
    var median = getMedian(extract_data);
    var median_node = getNodeByNumber(nodes, field, median);
    return { min: min_node, max: max_node, median: median_node };
}
function getMedian(array) {
    var list = util_1.clone(array);
    list.sort(function (a, b) {
        return a - b;
    });
    var half = Math.floor(list.length / 2);
    if (list.length % 2) {
        return list[half];
    }
    return list[half];
}
function getNodeByNumber(nodes, field, num) {
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var node = nodes_1[_i];
        var d = node.shape.get('origin');
        if (d[field] === num) {
            return node;
        }
    }
}
//# sourceMappingURL=nodes-resampling-by-state.js.map