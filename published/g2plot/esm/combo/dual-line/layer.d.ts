import ComboViewLayer from '../base';
import { LayerConfig } from '../../base/layer';
import { IValueAxis, ICatAxis, ITimeAxis } from '../../interface/config';
import { ComboViewConfig, LineConfig } from '../util/interface';
export interface DualLineViewConfig extends ComboViewConfig {
    xAxis?: IValueAxis | ICatAxis | ITimeAxis;
    tooltip?: any;
    lineConfigs?: LineConfig[];
}
interface DualLineLayerConfig extends DualLineViewConfig, LayerConfig {
}
export default class DualLineLayer<T extends DualLineLayerConfig = DualLineLayerConfig> extends ComboViewLayer<T> {
    static getDefaultOptions(): Partial<DualLineLayerConfig>;
    type: string;
    init(): void;
    protected tooltip(dom: any, ev: any): void;
    protected customLegend(): void;
}
export {};
