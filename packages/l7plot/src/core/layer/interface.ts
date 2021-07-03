import { ILayer, ILayerConfig, BlendType } from '@antv/l7-core';
import { ILabelConfig, Source } from '../../types';
import { animateAttr, ColorAttr, IStateAttribute, ShapeAttr, SizeAttr } from '../../types/attr';

/**
 * 点图层 图层样式
 */
export interface IPointLayerStyleOptions {
  opacity?: number;
  strokeWidth?: number;
  stroke?: string;
}

/**
 * 线图层 线类型
 */
export enum lineStyleType {
  'solid' = 0.0,
  'dash' = 1.0,
}

/**
 * 线图层 图层样式
 */
export interface ILineLayerStyleOptions {
  opacity?: number;
  lineType?: keyof typeof lineStyleType;
  dashArray?: [number, number];
  segmentNumber?: number;
}

/**
 * 面图层 图层样式
 */
export interface IPolygonLayerStyleOptions {
  opacity?: number;
}

/**
 * 图层基础配置
 */
export interface IBaseLayerConfig {
  name?: string;
  zIndex?: number;
  visible?: boolean;
  minZoom?: number;
  maxZoom?: number;
  pickingBuffer?: number;
  autoFit?: boolean;
  blend?: keyof typeof BlendType;
}

/**
 * 点图层基础配置
 */
export interface IPointLayerConfig extends Partial<IBaseLayerConfig & IPointLayerStyleOptions> {
  shape?: ShapeAttr<string>;
  color?: ColorAttr;
  size?: SizeAttr;
  state?: IStateAttribute;

  style?: IPointLayerStyleOptions;
  animate?: animateAttr;
}

/**
 * 文字图层基础配置
 */
export interface ILabelLayerConfig extends Partial<IBaseLayerConfig & ILabelConfig> {
  color?: ColorAttr;
  size?: SizeAttr;
  state?: IStateAttribute;
}

/**
 * 线图层基础配置
 */
export interface ILIneLayerConfig extends Partial<IBaseLayerConfig & ILineLayerStyleOptions> {
  shape?: ShapeAttr<string>;
  color?: ColorAttr;
  size?: SizeAttr;
  state?: IStateAttribute;

  style?: ILineLayerStyleOptions;
}

/**
 * 面图层基础配置
 */
export interface IPolygonLayerConfig extends Partial<IBaseLayerConfig & IPolygonLayerStyleOptions> {
  shape?: ShapeAttr<string>;
  color?: ColorAttr;
  size?: SizeAttr;
  state?: IStateAttribute;

  style?: IPolygonLayerStyleOptions;
}

/**
 * 热力图层基础配置
 */
export interface IHeatMapLayerConfig extends IBaseLayerConfig {
  shape?: ShapeAttr<string>;
  color?: ColorAttr;
  size?: SizeAttr;
  state?: IStateAttribute;

  style?: IPolygonLayerStyleOptions;
}

/**
 * BaseLayer Wrapper Class
 */
export interface IBaseLayerWrapper {
  layer: ILayer;
  options: IBaseLayerConfig;

  pickLayerConfig<T extends IBaseLayerConfig>(params: T): Partial<ILayerConfig>;
  updateOption<T>(options: T);
  changeData(source: Source);
}