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
      priority: 2,
    },
    controls: {
      type: 'check',
      name: 'Show Controls',
      value: false,
      priority: 4,
    },
    repeat: {
      type: 'check',
      name: 'Repeat',
      value: false,
      priority: 2,
    },
    muted: {
      type: 'check',
      name: 'Mute Volume',
      value: false,
      priority: 3,
    },
    value: {
      type: 'inputList',
      name: 'Video Sources',
      value: [],
      priority: 1,
    },
  },
};
