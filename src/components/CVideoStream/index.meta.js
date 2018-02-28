export default {
  group: 'widgets',
  type: 'video-stream',
  name: 'Video Stream',
  icon: 'video_call',
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
    value: {
      type: 'input',
      name: 'Stream Source',
      value: '',
      multiline: true,
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
