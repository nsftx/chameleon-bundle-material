import { isString, map, merge } from 'lodash';
import namespace from '@namespace';
import { elementable, fieldable } from '@mixins';

require('../../style/components/_video.styl');

const sourceTypes = {
  webm: 'video/webm',
  mp4: 'video/mp4',
  ogv: 'video/ogg',
};

const getAttrs = (definition) => {
  const attrs = {
    controls: definition.controls,
    loop: definition.repeat,
    muted: definition.muted,
    title: definition.label,
  };

  if (definition.autoplay) {
    attrs.autoplay = definition.autoplay;
  }

  return attrs;
};

const getSourceType = (source) => {
  const parts = source.split('.');
  const ext = parts.pop();

  return sourceTypes[ext];
};

const getSources = (createElement, definition) => {
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

export default {
  name: `${namespace}video`,
  mixins: [
    elementable,
    fieldable,
  ],
  render(createElement) {
    const self = this;

    return createElement(
      'video',
      {
        attrs: merge(getAttrs(this.definition), this.getSchemaAttributes()),
        on: {
          click() {
            if (self.$refs.video.paused) {
              self.$refs.video.play();
            } else {
              self.$refs.video.pause();
            }
          },
        },
        ref: 'video',
        staticClass: `${this.baseClass} ${this.$options.name}`,
      },
      getSources(createElement, this.definition),
    );
  },
};
