export default {
  group: 'widgets',
  type: 'youtube',
  name: 'You tube',
  icon: 'ondemand_video',
  options: {
    playlist: {
      type: 'select',
      name: 'Playlist type',
      items: [
        {
          id: 1,
          name: ' ',
          value: '',
        },
        {
          id: 2,
          name: 'Playlist',
          value: 'playlist',
        },
        {
          id: 3,
          name: 'User uploads',
          value: 'user_uploads',
        },
        {
          id: 4,
          name: 'Search results',
          value: 'search',
        },
      ],
      returnObject: false,
      displayProp: 'name',
      valueProp: 'value',
      value: '',
      priority: 1,
    },
    repeat: {
      type: 'check',
      name: 'Repeat video/list',
      value: false,
      priority: 3,
    },
    value: {
      type: 'inputList',
      name: 'Video/playlist source',
      value: [],
      priority: 2,
    },
  },
};
