import { Legend } from '@antv/component';
import ComboViewLayer from '../base';
import { LayerConfig } from '../../base/layer';
import { IColumnLabel } from '../../plots/column/interface';
import { ICatAxis, GraphicStyle } from '../../interface/config';
import { ComboViewConfig, LineConfig } from '../util/interface';
export interface ColumnConfig {
    color?: string | string[];
    columnSize?: number;
    columnStyle?: GraphicStyle | ((...args: any[]) => GraphicStyle);
    label?: IColumnLabel;
}
export interface ColumnLineViewConfig extends ComboViewConfig {
    xAxis?: ICatAxis;
    tooltip?: any;
    lineSeriesField?: string;
    lineConfig?: LineConfig;
    columnConfig?: ColumnConfig;
}
interface ColumnLineLayerConfig extends ColumnLineViewConfig, LayerConfig {
}
export default class ColumnLineLayer<T extends ColumnLineLayerConfig = ColumnLineLayerConfig> extends ComboViewLayer<T> {
    static getDefaultOptions(): Partial<ColumnLineLayerConfig>;
    type: string;
    protected colors: string[];
    protected legends: any[];
    beforeInit(): void;
    init(): void;
    protected drawColumn(): void;
    protected tooltip(dom: any, ev: any): void;
    protected customLegend(): void;
    protected createSingleLegend(name: any, symbol: any, color: any, cfg: any, container: any): Legend.Category;
    protected createNormalLegend(values: any, symbol: any, color: any, cfg: any, container: any): Legend.Category;
    protected multipleLegendFilter(index: any, field: any): void;
    protected getValueBySeriesField(): any[];
}
export {};
