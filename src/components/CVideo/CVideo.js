import { isString, map, isNil } from 'lodash';
import { fieldable } from '@mixins';
import Element from '../Element';

const sourceTypes = {
  webm: 'video/webm',
  mp4: 'video/mp4',
  ogv: 'video/ogg',
};

const getAttrs = (context) => {
  const definition = context.definition;

  const attrs = {
    controls: definition.controls,
    loop: definition.repeat,
    muted: definition.muted,
    title: definition.label,
    width: '100%',
    height: '100%',
  };

  if (definition.autoplay && !context.registry.isPreviewMode) {
    attrs.autoplay = definition.autoplay;
  }

  return attrs;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {};

  if (!self.registry.isPreviewMode) {
    listeners.click = () => {
      if (self.$refs.video.paused) {
        self.$refs.video.play();
      } else {
        self.$refs.video.pause();
      }
    };
  }

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
  const definition = context.definition;
  const srcValues = isString(definition.value) ? [definition.value] : definition.value;

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

const getStaticStyle = (definition) => {
  let height = 'auto';
  let paddingTop = 0;

  if (definition.aspectRatio !== 'auto' && !isNil(definition.aspectRatio)) {
    height = 0;
    const ratioValue = definition.aspectRatio.split(':');
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
  render(createElement) {
    const data = {
      staticStyle: getStaticStyle(this.definition),
    };

    const children = createElement(
      'video',
      {
        attrs: getAttrs(this),
        on: getListeners(this),
        ref: 'video',
        staticStyle: {
          position: this.definition.aspectRatio !== 'auto' ? 'absolute' : 'relative',
          top: 0,
          left: 0,
        },
      },
      getSources(createElement, this),
    );

    return this.renderElement('div', data, children);
  },
};
