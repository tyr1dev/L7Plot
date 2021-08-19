import { HexagonMapOptions, ISource } from './interface';
import { Source, ILayer, ISourceCFG, ITransform, IGridAggregation } from '../../types';
import { Plot } from '../../core/plot';
import { DEFAULT_OPTIONS } from './constants';
import { Heat } from '../heat';

export class HexagonMap extends Heat<HexagonMapOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = Plot.MapType.Hexagon;

  /**
   * 获取网格聚合配置
   */
  protected getAggregationConfig(aggregation: IGridAggregation) {
    const { radius, type: method, field } = aggregation;
    const aggregationType = 'hexagon';
    const config = { type: aggregationType, size: radius, method, field };
    return config;
  }

  /**
   * 映射网格聚合配置
   */
  protected mappingAggregation(sourceCFG: ISourceCFG, transform: ITransform) {
    if (sourceCFG.transforms) {
      // 过滤 sourceCFG 有相同配置情况
      sourceCFG.transforms = sourceCFG.transforms.filter((transform) => transform.type !== transform.type);
      sourceCFG.transforms.push(transform);
    } else {
      sourceCFG.transforms = [transform];
    }
  }

  /**
   * 创建 source 实例
   */
  protected createSource() {
    const { data, aggregation, ...sourceCFG } = this.options.source;
    const transformsHexagon = this.getAggregationConfig(aggregation);
    this.mappingAggregation(sourceCFG, transformsHexagon);
    const source = new Source(data, sourceCFG);
    return source;
  }

  /**
   * 更新: 更新数据
   */
  public changeData(data: any, cfg?: Omit<ISource, 'data'>) {
    if (cfg) {
      const transformsHexagon = this.getAggregationConfig(cfg.aggregation);
      this.mappingAggregation(cfg, transformsHexagon);
    }

    this.source.setData(data, cfg);
  }

  /**
   * 蜂窝图层
   */
  get hexagonLayer(): ILayer {
    return this.heatmapLayerWrapper.layer;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<HexagonMapOptions> {
    return HexagonMap.DefaultOptions;
  }

  /**
   * 创建图层之前 hook
   */
  protected beforeCreateLayers() {
    const heatmapLayerConfig = { name: 'hexagonLayer' };

    return { heatmapLayerConfig };
  }
}