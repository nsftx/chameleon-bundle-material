export default {
  group: 'widgets',
  type: 'video',
  name: 'Video',
  icon: 'theaters',
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
      value: false,
      priority: 6,
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
    value: {
      type: 'inputList',
      name: 'Video Sources',
      value: [],
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
  },
};
