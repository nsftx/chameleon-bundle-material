import { isNil } from 'lodash';
import { binding } from '@/utility';

const itemInterface = [
  {
    name: 'url',
    type: 'String',
    label: 'Url',
  },
];

const expressionImport = {
  imports: {
    isNil,
  },
};

export default {
  group: 'widgets',
  type: 'video-stream',
  name: 'Video Stream',
  icon: 'video_call',
  actions: [
    {
      name: 'setDataSource',
      help: 'Sets video strema data source from event data',
    },
  ],
  events: [
    {
      name: 'DataSourceChanged',
      help: 'Fires when video stream data source is changed',
    },
  ],
  options: {
    streamType: {
      type: 'select',
      name: 'Stream Type',
      items: [
        {
          name: 'Image',
          value: 'image',
        },
        {
          name: 'MPEG-1',
          value: 'jsmpeg',
        },
      ],
      value: 'img',
      priority: 1,
    },
    aspectRatio: {
      type: 'select',
      name: 'Aspect Ratio',
      items: [
        {
          name: 'Auto',
          value: 'auto',
        },
        {
          name: '16:9',
          value: '16:9',
        },
        {
          name: '4:3',
          value: '4:3',
        },
      ],
      value: 'auto',
      priority: 2,
    },
    value: {
      type: 'input',
      group: 'data',
      name: 'Stream Source',
      value: null,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.dataSource) %>', expressionImport),
      },
      priority: 2,
    },
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
      schema: itemInterface,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.value) && element.value.length > 0 %>', expressionImport),
      },
      priority: 1,
    },
  },
};
