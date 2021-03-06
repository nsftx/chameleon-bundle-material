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
  type: 'video',
  name: 'Video',
  icon: 'theaters',
  actions: [
    {
      name: 'setDataSource',
      help: 'Sets video data source from event data',
    },
    {
      name: 'play',
      help: 'Start playing',
    },
    {
      name: 'pause',
      help: 'Pause video',
    },
    {
      name: 'toggle',
      help: 'Toggle of video states',
    },
  ],
  events: [
    {
      name: 'DataSourceChanged',
      help: 'Fires when video data source is changed',
    },
    {
      name: 'PlayerReadyChanged',
      help: 'Video ready state changed',
    },
    {
      name: 'PlayerErrored',
      help: 'On player error',
    },
    {
      name: 'Played',
      help: 'Video started playing',
    },
    {
      name: 'Paused',
      help: 'Video stoped playing',
    },
    {
      name: 'Ended',
      help: 'Video ended',
    },
  ],
  options: {
    label: {
      type: 'input',
      name: 'Video Title',
      value: 'Video Title',
      priority: 1,
    },
    autoplay: {
      type: 'check',
      name: 'Autoplay',
      hint: 'This might not work properly in Chrome',
      value: false,
      priority: 3,
    },
    controls: {
      type: 'check',
      name: 'Show Controls',
      value: false,
      priority: 7,
    },
    repeat: {
      type: 'check',
      name: 'Repeat',
      value: false,
      priority: 4,
    },
    muted: {
      type: 'check',
      name: 'Mute Volume',
      value: false,
      priority: 5,
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
      type: 'inputList',
      group: 'data',
      name: 'Video Source',
      value: [],
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
