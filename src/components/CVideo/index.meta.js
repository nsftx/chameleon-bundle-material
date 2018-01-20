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
      name: 'Controls',
      value: false,
    },
    repeat: {
      type: 'check',
      name: 'Repeat',
      value: false,
    },
    muted: {
      type: 'check',
      name: 'Muted',
      value: false,
    },
    width: {
      type: 'input',
      name: 'Width',
      value: null,
    },
    value: {
      type: 'inputList',
      name: 'Sources',
      value: [],
    },
  },
};
