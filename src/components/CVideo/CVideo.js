import {
  isString, isObject, map, isNil,
} from 'lodash';
import Element from '../Element';

const sourceTypes = {
  webm: 'video/webm',
  mp4: 'video/mp4',
  ogv: 'video/ogg',
};

const getAttrs = (context) => {
  const { config } = context;

  const attrs = {
    controls: config.controls,
    loop: config.repeat,
    title: config.label,
    width: '100%',
    height: '100%',
  };

  if (config.autoplay && !context.registry.isPreviewMode) {
    attrs.autoplay = config.autoplay;
  }

  return attrs;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    canplay: (event) => {
      self.sendToEventBus('PlayerReadyChanged', event);
    },
    playing: (event) => {
      self.sendToEventBus('Played', event);
    },
    pause: (event) => {
      self.sendToEventBus('Paused', event);
    },
    ended: (event) => {
      self.sendToEventBus('Ended', event);
    },
    error: (event) => {
      self.sendToEventBus('PlayerErrored', event);
    },
  };

  return listeners;
};

const getSourceType = (source) => {
  if (source) {
    const parts = source.split('.');
    const ext = parts.pop();
    return sourceTypes[ext];
  }
  return sourceTypes.mp4;
};

const getSources = (createElement, data) => {
  const srcValues = isString(data) ? [data] : data;

  const sources = map(srcValues, (value) => {
    const source = isObject(value) ? value.url : value;
    const el = createElement(
      'source',
      {
        attrs: {
          src: source,
          type: getSourceType(source),
        },
      },
    );

    return el;
  });

  return sources;
};

const getStaticStyle = (config) => {
  let height = 'auto';
  let paddingTop = 0;

  if (config.aspectRatio !== 'auto' && !isNil(config.aspectRatio)) {
    height = 0;
    const ratioValue = config.aspectRatio.split(':');
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
};

export default {
  extends: Element,
  watch: {
    dataSource: {
      handler() {
        this.loadData();
      },
      deep: true,
    },
  },
  methods: {
    play() {
      this.$refs.video.play();
    },
    pause() {
      this.$refs.video.pause();
    },
    toggle() {
      if (!this.$refs.video.paused) {
        this.pause();
      } else {
        this.play();
      }
    },
  },
  render(createElement) {
    const data = {
      staticStyle: getStaticStyle(this.config),
    };
    const source = this.items || this.config.value;

    const children = createElement(
      'video',
      {
        attrs: getAttrs(this),
        on: getListeners(this),
        ref: 'video',
        staticStyle: {
          position: this.config.aspectRatio !== 'auto' ? 'absolute' : 'relative',
          top: 0,
          left: 0,
        },
      },
      getSources(createElement, source),
    );

    return this.renderElement('div', data, children);
  },
  mounted() {
    this.$refs.video.muted = this.config.muted;
  },
};
