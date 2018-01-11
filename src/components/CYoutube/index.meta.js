export default {
  group: 'widgets',
  type: 'youtube',
  name: 'You tube',
  icon: 'ondemand_video',
  options: {
    playlist: {
      type: 'select',
      items: [
        {
          id: 1,
          name: '-',
          value: false,
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
      displayProp: 'name',
      valueProp: 'value',
      value: false,
    },
    repeat: {
      type: 'check',
      name: 'Repeat video/list',
      value: false,
    },
    value: {
      type: 'list',
      value: [],
    },
  },
};
