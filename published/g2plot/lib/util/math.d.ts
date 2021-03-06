declare function dotProduct2D(va: any, vb: any): number;
declare function angleTo(va: any, vb: any): number;
declare function crossProduct2D(va: any, vb: any): number;
declare function crossProduct3D(va: any, vb: any): {
    x: number;
    y: number;
    z: number;
};
declare function sub2D(va: any, vb: any): {
    x: number;
    y: number;
};
declare function applyMatrix(point: any, matrix: any, tag?: number): {
    x: any;
    y: any;
};
declare function isBetween(value: any, min: any, max: any): boolean;
declare function getLineIntersect(p0: any, p1: any, p2: any, p3: any): any;
declare function isPointInPolygon(p: any, polygon: any): boolean;
declare function dist2(a: any, b: any): number;
declare function distBetweenPoints(a: any, b: any): number;
declare function distBetweenPointLine(p: any, p1: any, p2: any): number;
declare function isPolygonIntersection(polyA: any, polyB: any): boolean;
declare function minDistBetweenConvexPolygon(polyA: any, polyB: any): number;
declare function bboxOnRotate(shape: any): {
    width: number;
    height: number;
    left: any;
    right: any;
    top: any;
    bottom: any;
    topLeft: {
        x: any;
        y: any;
    };
    topRight: {
        x: any;
        y: any;
    };
    bottomLeft: {
        x: any;
        y: any;
    };
    bottomRight: {
        x: any;
        y: any;
    };
    centerX: any;
    centerY: any;
};
declare function lineSimplification(points: any): any;
/** 统计的以后迁出去，暂时先放这里 */
declare function getMedian(array: any): any;
declare function getMean(array: any): number;
declare function sturges(values: any): number;
export { applyMatrix, isBetween, getLineIntersect, isPointInPolygon, distBetweenPoints, distBetweenPointLine, isPolygonIntersection, minDistBetweenConvexPolygon, bboxOnRotate, dotProduct2D, crossProduct2D, crossProduct3D, sub2D, angleTo, lineSimplification, getMedian, getMean, sturges, dist2, };
/**
 * 获取 x/y/width/height指定的BBox边界上的所有点，由step抽样
 * @param x
 * @param y
 * @param width
 * @param height
 * @param step
 */
export declare function getStrokePoints(x: number, y: number, width: number, height: number, step?: number): [number, number][];
