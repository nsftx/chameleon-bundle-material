import { isNil, isFunction, isObject, template, upperFirst } from 'lodash';
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
        const isMasked = !isNil(this.config.valueMask);
        const isValueObject = isObject(this.items[0]);
        const value = isValueObject ? this.items[0].url : this.items[0];

        return isMasked && isValueObject ? template(this.config.valueMask)(this.items[0]) : value;
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
      if (this.streamValue) {
        this.player = new window[`${this.playerHandler}`].Player(this.streamValue, {
          canvas: this.$refs.canvas,
        });

        this.player.play();
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
  },
  watch: {
    dataSource: {
      handler(current, previous) {
        this.loadData().then(() => {
          if (!isNil(previous) && !isNil(this.playerHandler)) {
            this.createPlayer();
          }
        });
      },
      deep: true,
    },
  },
  mounted() {
    if (this.dependencies) {
      this.playerHandler = this.dependencies.global;
      this.loadDependencies(this.dependencies.files, this.playerHandler).then(() => {
        this.createPlayer();
      });
    }
  },
  render() {
    const children = this[`renderType${this.streamType}`]();

    return this.renderElement('div', {
      staticStyle: this.staticStyle,
    }, children);
  },
  beforeDestroy() {
    if (this.player && isFunction(this.player.destroy)) {
      this.player.destroy();
    }
  },
};
