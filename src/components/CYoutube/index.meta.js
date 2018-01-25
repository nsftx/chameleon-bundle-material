/* eslint-disable */
/**
 * @module YouTube
 * @typicalname CYoutube
 *
 * @desc Widget that enables embedding of YouTube videos, playlists, user uploads, and search results
 *
 * @group widgets
 */
/* eslint-enable */

export default {
  group: 'widgets',
  type: 'youtube',
  name: 'YouTube',
  icon: 'ondemand_video',
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
      value: true,
      priority: 6,
    },
    muted: {
      type: 'check',
      name: 'Mute Volume',
      value: false,
      priority: 5,
    },
    playlist: {
      type: 'select',
      name: 'Playlist Type',
      items: [
        {
          id: 1,
          name: 'Video',
          value: '',
        },
        {
          id: 2,
          name: 'Playlist',
          value: 'playlist',
        },
        {
          id: 3,
          name: 'User Uploads',
          value: 'user_uploads',
        },
        {
          id: 4,
          name: 'Search Results',
          value: 'search',
        },
      ],
      returnObject: false,
      displayProp: 'name',
      valueProp: 'value',
      value: [],
      priority: 1,
    },
    repeat: {
      type: 'check',
      name: 'Repeat Video/List',
      value: false,
      priority: 4,
    },
    value: {
      type: 'inputList',
      name: 'Video/Playlist Source',
      value: [],
      priority: 2,
    },
  },
};
