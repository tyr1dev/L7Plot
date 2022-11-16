import React, { Component } from 'react';
import { Scene, GaodeMap } from '@antv/l7';
import { LineLayer } from '@antv/l7';

class Demo extends Component {
  public scene: Scene | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    this.scene = new Scene({
      id: 'container',
      map: new GaodeMap({
        pitch: 0,
        style: 'dark',
        center: [103.447303, 31.753574],
        zoom: 7,
      }),
    });

    const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/1atwIMvcMo/beijinggongjiaoluxian.json');
    const data = await response.json();

    const lineLayer = new LineLayer({ autoFit: true })
      .source(data, {
        parser: {
          type: 'json',
          coordinates: 'lnglat',
        },
      })
      .shape('line')
      .size(1.5)
      .color('line_name', ['#5B8FF9', '#5CCEA1', '#5D7092'])
      .style({ opacity: 0.8, lineType: 'solid' as const, targetColor: 'red', sourceColor: 'blue' })
      .active({ color: '#FFF684' })
      .animate({
        interval: 0.5,
        trailLength: 2,
        duration: 1,
      });

    this.scene && this.scene.addLayer(lineLayer);
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.scene && this.scene.destroy();
  }

  render() {
    return (
      <div
        id="container"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></div>
    );
  }
}

export default Demo;
