import { storiesOf } from '@storybook/react';

import BasicDemo from './Basic';
import L7BasicDemo from './L7Basic';
import Grid from './Grid';
import Hexagon from './Hexagon';

storiesOf('热力地图', module)
  .add('热力地图', () => <BasicDemo />)
  .add('热力地图-L7', () => <L7BasicDemo />)
  .add('网格热力图', () => <Grid />)
  .add('蜂窝热力图', () => <Hexagon />);