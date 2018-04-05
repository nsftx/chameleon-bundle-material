import { isNil, filter, map, merge } from 'lodash';
import { dependable, elementable } from '@mixins';

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
    loop: context.definition.repeat,
  };

  if (context.playlist) {
    return merge(getPlaylistParameters(context), params);
  }

  return merge(getVideoParameters(context), params);
};

export default {
  mixins: [
    dependable,
    elementable,
  ],
  data() {
    return {
      player: null,
      playlist: '',
      predefinedPlaylist: false,
    };
  },
  computed: {
    value() {
      return this.definition.value;
    },
  },
  methods: {
    createPlayer() {
      this.player = new window.YT.Player(this.$refs.youtube, {
        playerVars: {
          controls: this.definition.controls,
          videoId: 'M7lc1UVf-VE',
        },
        events: {
          onReady: this.onPlayerReady,
        },
      });

      if (this.definition.muted) {
        this.player.mute();
      }
    },
    onPlayerReady() {
      const method = getPlayerMethod(this.playlist, this.definition.autoplay);
      const params = getPlayerParameters(this);

      this.player[method](params);
    },
  },
  mounted() {
    if (isNil(this.definition.playlist)) {
      this.definition.playlist = {};
    }
    if (isNil(this.definition.value)) {
      this.definition.value = {};
    }
    this.playlist = this.definition.playlist.length || this.definition.value.length > 1;
    this.predefinedPlaylist = this.definition.playlist.length ? this.definition.playlist : false;

    this.loadDependencies('https://www.youtube.com/iframe_api', 'YT.Player').then(() => {
      this.createPlayer();
    });
  },
  render(createElement) {
    return createElement(
      'div',
      {
        ref: 'youtube',
        attrs: this.getSchemaAttributes(),
        staticClass: `${this.baseClass} ${this.$options.name}`,
      },
    );
  },
};
