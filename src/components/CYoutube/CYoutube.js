import { isNil, isObject, filter, map, merge } from 'lodash';
import Element from '../Element';

const getVideoId = (src) => {
  const url = isObject(src) ? src.url : src;
  const re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
  const result = re.exec(url);

  return result ? result[1] : null;
};

const getPlaylistParameters = (context) => {
  if (context.config.playlist !== 'playlist') {
    const value = isObject(context.value[0]) ? context.value[0].url : context.value[0];
    return {
      listType: context.config.playlist,
      list: value,
    };
  }

  return {
    listType: 'playlist',
    playlist: filter(map(context.value, video => getVideoId(video)), item => !isNil(item)),
  };
};

const getPreviewOverlayElement = (createElement) => {
  const overlay = createElement(
    'div',
    {
      staticStyle: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
      },
    },
  );

  return overlay;
};

const getPlayerMethod = (context) => {
  const autoplay = context.config.autoplay && !context.registry.isPreviewMode;

  const method = autoplay ? 'load' : 'cue';
  const item = context.playlist ? 'Playlist' : 'VideoById';

  return `${method}${item}`;
};

const getPlayerParameters = (context) => {
  let params = {
    videoId: context.value ? getVideoId(context.value[0]) : null,
  };

  if (context.playlist) {
    params = merge(getPlaylistParameters(context), params);
  }

  return params;
};

export default {
  extends: Element,
  data() {
    return {
      items: null,
      player: null,
      playlist: '',
    };
  },
  computed: {
    value() {
      return this.items || this.config.value;
    },
  },
  watch: {
    dataSource: {
      handler() {
        this.loadData();
      },
      deep: true,
    },
  },
  methods: {
    loadData() {
      this.loadConnectorData().then((result) => {
        this.items = result.items || null;
        this.sendToEventBus('DataSourceChanged', this.dataSource);
      });
    },
    createPlayer() {
      this.player = new window.YT.Player(this.$refs.youtube, {
        videoId: 'VIDEO_ID',
        playerVars: {
          controls: this.config.controls ? 1 : 0,
        },
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange,
          onError: this.onPlayerError,
        },
      });
    },
    onPlayerReady(event) {
      const method = getPlayerMethod(this);
      const params = getPlayerParameters(this);

      this.player[method](params);

      if (this.config.muted) {
        this.player.mute();
      }

      if (this.config.repeat) {
        this.player.setLoop(true);
      }

      this.sendToEventBus('PlayerReadyChanged', event);
    },
    onPlayerStateChange(event) {
      switch (event.data) {
        case 0:
          this.sendToEventBus('Ended', event);
          break;
        case 1:
          this.sendToEventBus('Played', event);
          break;
        case 2:
          this.sendToEventBus('Paused', event);
          break;
        case 3:
          this.sendToEventBus('Buffered', event);
          break;
        default:
          this.sendToEventBus('PlayerStateChanged', event);
      }
    },
    onPlayerError(event) {
      this.sendToEventBus('PlayerErrored', event);
    },
    play() {
      this.player.playVideo();
    },
    pause() {
      this.player.pauseVideo();
    },
    stop() {
      this.player.stopVideo();
    },
  },
  mounted() {
    this.playlist = this.value && this.value.length > 1;

    this.loadDependencies('https://www.youtube.com/iframe_api', 'YT.Player').then(() => {
      this.createPlayer();
    });
  },
  render(createElement) {
    const children = [createElement(
      'div',
      {
        ref: 'youtube',
      },
    )];
    let props = {};

    if (this.registry.isPreviewMode) {
      children.unshift(getPreviewOverlayElement(createElement));
      props = {
        staticStyle: {
          position: 'relative',
        },
      };
    }

    return this.renderElement('div', props, children);
  },
};
