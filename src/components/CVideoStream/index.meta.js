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
      type: 'inputList',
      name: 'Stream Sources',
      value: [],
      priority: 2,
    },
    aspectRatio: {
      type: 'select',
      name: 'Aspect Ratio',
      items: [
        {
          name: 'auto',
          value: 'auto',
        },
        {
          name: '16:9',
          value: '56.25%',
        },
        {
          name: '4:3',
          value: '75%',
        },
      ],
      value: '56.25%',
      priority: 3,
    },
  },
};
