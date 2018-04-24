import { isNil, filter, map, merge } from 'lodash';
import Element from '../Element';

const getVideoId = (url) => {
  const re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
  const result = re.exec(url);

  return result ? result[1] : null;
};

const getPlaylistId = (url) => {
  const re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])?.*?(?:list)=(.*?)(?:&|$)/ig;
  const result = re.exec(url);

  return result ? result[1] : null;
};

const getPlaylistParameters = (context) => {
  if (context.predefinedPlaylist) {
    return {
      listType: context.predefinedPlaylist,
      list: context.predefinedPlaylist === 'playlist' ? getPlaylistId(context.value[0]) : context.value[0],
    };
  }

  return {
    listType: 'playlist',
    playlist: filter(map(context.value, video => getVideoId(video)), item => !isNil(item)),
  };
};

const getVideoParameters = (context) => {
  const result = {
    videoId: getVideoId(context.value[0]),
  };

  return result;
};

const getPlayerMethod = (playlist, autoplay) => {
  const method = autoplay ? 'load' : 'cue';
  const item = playlist ? 'Playlist' : 'VideoById';

  return `${method}${item}`;
};

const getPlayerParameters = (context) => {
  const params = {
    loop: context.config.repeat,
  };

  if (context.playlist) {
    return merge(getPlaylistParameters(context), params);
  }

  return merge(getVideoParameters(context), params);
};

export default {
  extends: Element,
  data() {
    return {
      player: null,
      playlist: '',
      predefinedPlaylist: false,
    };
  },
  computed: {
    value() {
      return this.config.value;
    },
  },
  methods: {
    createPlayer() {
      this.player = new window.YT.Player(this.$refs.youtube, {
        playerVars: {
          controls: this.config.controls,
          videoId: 'M7lc1UVf-VE',
        },
        events: {
          onReady: this.onPlayerReady,
        },
      });

      if (this.config.muted) {
        this.player.mute();
      }
    },
    onPlayerReady() {
      const method = getPlayerMethod(this.playlist, this.config.autoplay);
      const params = getPlayerParameters(this);

      this.player[method](params);
    },
  },
  mounted() {
    if (isNil(this.config.playlist)) {
      this.config.playlist = {};
    }
    if (isNil(this.config.value)) {
      this.config.value = {};
    }
    this.playlist = this.config.playlist.length || this.config.value.length > 1;
    this.predefinedPlaylist = this.config.playlist.length ? this.config.playlist : false;

    this.loadDependencies('https://www.youtube.com/iframe_api', 'YT.Player').then(() => {
      this.createPlayer();
    });
  },
  render() {
    const data = {
      ref: 'youtube',
    };
    return this.renderElement('div', data);
  },
};
