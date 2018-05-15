import { isString, map, isNil } from 'lodash';
import { fieldable } from '@mixins';
import Element from '../Element';

const sourceTypes = {
  webm: 'video/webm',
  mp4: 'video/mp4',
  ogv: 'video/ogg',
};

const getAttrs = (context) => {
  const config = context.config;

  const attrs = {
    controls: config.controls,
    loop: config.repeat,
    muted: config.muted,
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

const getSources = (createElement, context) => {
  const config = context.config;
  const srcValues = isString(config.value) ? [config.value] : config.value;

  const sources = map(srcValues, (source) => {
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
  mixins: [
    fieldable,
  ],
  methods: {
    play() {
      this.$refs.video.play();
    },
    pause() {
      this.$refs.video.pause();
    },
  },
  render(createElement) {
    const data = {
      staticStyle: getStaticStyle(this.config),
    };

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
      getSources(createElement, this),
    );

    return this.renderElement('div', data, children);
  },
};
