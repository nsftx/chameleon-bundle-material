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
  type: 'youtube',
  name: 'YouTube',
  icon: 'ondemand_video',
  optionGroups: {
    data: {
      key: 'data',
      name: 'Data',
    },
  },
  actions: [
    {
      name: 'setDataSource',
      help: 'Sets youtube data source from event data',
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
      name: 'stop',
      help: 'Stop playing',
    },
  ],
  events: [
    {
      name: 'DataSourceChanged',
      help: 'Fires when youtube data source is changed',
    },
    {
      name: 'PlayerReadyChanged',
      help: 'Video ready state changed',
    },
    {
      name: 'PlayerStateChanged',
      help: 'Toggle of video states',
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
    {
      name: 'Buffered',
      help: 'Video buffered',
    },
  ],
  options: {
    autoplay: {
      type: 'check',
      name: 'Autoplay',
      value: false,
      priority: 3,
    },
    controls: {
      type: 'check',
      name: 'Show Controls',
      value: true,
      priority: 6,
    },
    muted: {
      type: 'check',
      name: 'Mute Volume',
      value: false,
      priority: 5,
    },
    playlist: {
      type: 'select',
      name: 'Playlist Type',
      items: [
        {
          id: 1,
          name: 'Playlist',
          value: 'playlist',
        },
        {
          id: 3,
          name: 'Search Results',
          value: 'search',
        },
      ],
      returnObject: false,
      displayProp: 'name',
      valueProp: 'value',
      value: 'playlist',
      priority: 1,
    },
    repeat: {
      type: 'check',
      name: 'Repeat Video/List',
      value: false,
      priority: 4,
    },
    value: {
      type: 'inputList',
      name: 'Video/Playlist Source',
      group: 'data',
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
