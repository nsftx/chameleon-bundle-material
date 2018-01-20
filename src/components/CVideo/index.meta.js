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
    },
    controls: {
      type: 'check',
      name: 'Show Controls',
      value: false,
    },
    repeat: {
      type: 'check',
      name: 'Repeat',
      value: false,
    },
    muted: {
      type: 'check',
      name: 'Mute Volume',
      value: false,
    },
    value: {
      type: 'inputList',
      name: 'Video Sources',
      value: [],
    },
  },
};
