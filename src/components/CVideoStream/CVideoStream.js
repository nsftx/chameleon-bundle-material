import {
  isNil, isFunction, isObject, upperFirst,
} from 'lodash';
import Element from '../Element';

export default {
  extends: Element,
  data() {
    return {
      player: null,
      playerHandler: null,
    };
  },
  computed: {
    dependencies() {
      if (this.streamType === 'Jsmpeg') {
        return {
          files: ['https://jsmpeg.com/jsmpeg.min.js'],
          global: 'JSMpeg',
        };
      }

      return null;
    },
    staticStyle() {
      let height = 'auto';
      let paddingTop = 0;

      if (this.config.aspectRatio !== 'auto' && !isNil(this.config.aspectRatio)) {
        height = 0;
        const ratioValue = this.config.aspectRatio.split(':');
        paddingTop = `${(ratioValue[1] / ratioValue[0]) * 100}%`;
      }

      const style = {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height,
        paddingTop,
      };

      return style;
    },
    streamValue() {
      if (this.items && this.items.length) {
        const isValueObject = isObject(this.items[0]);
        const value = isValueObject ? this.items[0].url : this.items[0];

        return value;
      }

      return this.config.value;
    },
    streamType() {
      let type = isNil(this.config.streamType) ? 'image' : this.config.streamType;

      if (type === 'img') type = 'image';

      return upperFirst(type);
    },
  },
  methods: {
    createPlayer() {
      this.destroyPlayer();

      if (this.streamValue) {
        this.player = new window[`${this.playerHandler}`].Player(this.streamValue, {
          canvas: this.$refs.canvas,
          onPlay: this.onPlayVideoStream(),
          onPause: this.onPauseVideoStream(),
        });
        this.player.play();
      }
    },
    destroyPlayer() {
      if (this.player && isFunction(this.player.destroy)) {
        this.player.destroy();
        this.player = null;
      }
    },
    onPlayVideoStream(player) {
      this.sendToEventBus('Played', player);
    },
    onPauseVideoStream(player) {
      this.sendToEventBus('Paused', player);
    },
    play() {
      this.player.play();
    },
    pause() {
      this.player.pause();
    },
    toggle() {
      if (this.player.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    },
    renderTypeImage() {
      return this.$createElement(
        'img',
        {
          attrs: {
            src: this.streamValue || null,
            width: '100%',
            height: '100%',
          },
          staticStyle: {
            position: this.config.aspectRatio !== 'auto' ? 'absolute' : 'relative',
            top: 0,
            left: 0,
          },
        },
      );
    },
    renderTypeJsmpeg() {
      return this.$createElement(
        'canvas',
        {
          ref: 'canvas',
          staticStyle: {
            position: this.config.aspectRatio !== 'auto' ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          },
        },
      );
    },
    renderPlaceholder(createElement) {
      const data = {
        staticStyle: {
          width: this.width,
          height: '50px',
        },
      };

      return createElement('div', data);
    },
    checkDependencies() {
      if (this.dependencies && !isNil(window[this.dependencies.global])) {
        this.playerHandler = this.dependencies.global;
        return;
      }
      if (this.dependencies && isNil(window[this.dependencies.global])) {
        this.loadDependencies(this.dependencies.files, this.dependencies.global).then(() => {
          this.playerHandler = this.dependencies.global;
        });
      }
    },
  },
  watch: {
    dataSource: {
      handler() {
        this.loadData().then(() => {
          if (!isNil(this.playerHandler)) {
            this.createPlayer();
          }
        });
      },
      deep: true,
    },
    streamType(value) {
      if (!isNil(value)) {
        this.checkDependencies();
      }
    },
  },
  mounted() {
    if (this.dependencies) {
      this.loadDependencies(this.dependencies.files, this.dependencies.global).then(() => {
        this.playerHandler = this.dependencies.global;
        this.createPlayer();
      });
    }
  },
  render(createElement) {
    const children = this.streamValue ? this[`renderType${this.streamType}`]() : this.renderPlaceholder(createElement);

    return this.renderElement('div', {
      staticStyle: this.staticStyle,
    }, children);
  },
  beforeDestroy() {
    this.destroyPlayer();
  },
};
