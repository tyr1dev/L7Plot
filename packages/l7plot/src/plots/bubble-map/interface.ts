import { ISourceCFG } from '../../types';
import { PointMapOptions } from '../point-map/interface';

/**
 * 数据配置
 */
export interface ISource extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
}

/** 气泡图的配置类型定义 */
export interface BubbleMapOptions extends PointMapOptions {
  /**
   * 图形形状
   */
  shape?: 'circle';
  /**
   * 具体的数据
   */
  source: ISource;
}