import TextDescription from '../components/description';
import BBox from '../util/bbox';
import Layer, { LayerConfig } from '../base/layer';
import ViewLayer from '../base/view-layer';
import ThemeController from '../base/controller/theme';
import { ComboViewConfig } from './util/interface';
import { DataItem } from '../interface/config';
export interface IComboViewLayer extends ComboViewConfig, LayerConfig {
}
export default abstract class ComboViewLayer<T extends IComboViewLayer = IComboViewLayer> extends Layer<T> {
    static getDefaultOptions(): Partial<ComboViewConfig>;
    initialOptions: T;
    title: TextDescription;
    description: TextDescription;
    viewRange: BBox;
    theme: any;
    type: string;
    protected themeController: ThemeController;
    protected geomLayers: ViewLayer[];
    protected colors: string[];
    protected legends: any[];
    protected requiredField: string[];
    constructor(props: T);
    getOptions(props: Partial<T>): T;
    checkData(): boolean;
    init(): void;
    updateConfig(cfg: Partial<T>): void;
    changeData(data: DataItem[][]): void;
    changeDataByIndex(data: any, index: any): void;
    protected doDestroy(): void;
    protected createLayer(LayerCtr: any, data: any, config: any): any;
    protected yAxis(index: number): any;
    protected getTicks(): any[];
    protected getScaleData(index: number): {
        min: any;
        max: any;
        values: any[];
    };
    protected getDataByXField(value: number | string, index: number): DataItem[];
    protected getYAxisGlobalConfig(): {
        min: number;
        max: number;
        tickCount: number;
    };
    protected adjustLayout(): void;
    protected legendFilter(index: any): void;
    protected hideLayer(index: any): void;
    protected showLayer(index: any): void;
    protected setGeometryVisibility(view: any, show: any): void;
    protected getYAxisContainer(view: any, field: any): any;
    protected getUnCheckedValue(): any[];
    protected drawTitle(): void;
    protected drawDescription(): void;
    protected getViewRange(): BBox;
    protected getMockData(index: number): {}[];
}
