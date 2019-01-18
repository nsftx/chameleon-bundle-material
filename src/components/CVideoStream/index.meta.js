import { binding } from '@nsoft/chameleon-sdk/src/utility';

const itemInterface = [
  {
    name: 'url',
    type: 'String',
    label: 'Url',
  },
];

export default {
  group: 'widgets',
  type: 'video-stream',
  name: 'Video Stream',
  icon: 'video_call',
  optionGroups: {
    data: {
      key: 'data',
      name: 'Data',
    },
  },
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
          name: 'Simple',
          value: 'img',
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
        expression: binding.setExpression('<%= element.dataSource != null %>'),
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
        expression: binding.setExpression('<%= element.value != null && element.value.length > 0 %>'),
      },
      priority: 1,
    },
  },
};
