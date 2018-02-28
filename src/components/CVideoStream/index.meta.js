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
          id: 'auto',
          name: 'Auto',
        },
        {
          id: '16:9',
          name: '16:9',
        },
        {
          id: '4:3',
          name: '4:3',
        },
      ],
      displayProp: 'name',
      valueProp: 'id',
      value: 'auto',
      priority: 3,
    },
  },
};
