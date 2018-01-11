import _ from 'lodash';

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
    playlist: _.filter(_.map(context.value, video => getVideoId(video)), item => !_.isNil(item)),
  };
};

const getVideoParameters = (context) => {
  const result = {
    videoId: getVideoId(context.value[0]),
  };

  return result;
};

const getPlayerParameters = (context) => {
  const params = {
    loop: context.definition.repeat,
  };

  if (context.playlist) {
    return _.merge(getPlaylistParameters(context), params);
  }

  return _.merge(getVideoParameters(context), params);
};

export default {
  name: 'c-youtube',
  props: {
    definition: {
      type: Object,
      required: true,
    },
    validators: {
      type: Object,
    },
  },
  data() {
    return {
      player: null,
      playlist: false,
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
        events: {
          onReady: this.onPlayerReady,
        },
      });
    },
    loadApi() {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.setAttribute('async', null);
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = this.createPlayer.bind(this);
    },
    onPlayerReady() {
      const method = this.playlist ? 'loadPlaylist' : 'loadVideoById';
      const params = getPlayerParameters(this);

      this.player[method](params);
    },
  },
  mounted() {
    this.playlist = _.isString(this.definition.playlist) || this.definition.value.length > 1;
    this.predefinedPlaylist = this.definition.playlist;
    this.loadApi();
  },
  render(createElement) {
    return createElement(
      'div',
      {
        ref: 'youtube',
        staticClass: 'c-youtube',
      },
    );
  },
};
