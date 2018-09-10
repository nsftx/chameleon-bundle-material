export default {
  group: 'widgets',
  type: 'video',
  name: 'Video',
  icon: 'theaters',
  actions: [
    {
      name: 'play',
      help: 'Start playing',
    },
    {
      name: 'pause',
      help: 'Pause video',
    },
  ],
  events: [
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
      priority: 4,
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
      priority: 5,
    },
    muted: {
      type: 'check',
      name: 'Mute Volume',
      value: false,
      priority: 6,
    },
    value: {
      type: 'inputList',
      name: 'Video Sources',
      value: [],
      priority: 2,
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
      priority: 3,
    },
  },
};
