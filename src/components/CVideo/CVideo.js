import _ from 'lodash';
import fieldable from '../../mixins/fieldable';

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
  const sources = _.map(definition.value, (source) => {
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
  name: 'c-video',
  mixins: [
    fieldable,
  ],
  render(createElement) {
    const self = this;

    return createElement(
      'video',
      {
        attrs: getAttrs(this.definition),
        ref: 'video',
        style: {
          width: this.definition.width || '100%',
          maxWidth: '100%',
        },
        on: {
          click() {
            if (self.$refs.video.paused) {
              self.$refs.video.play();
            } else {
              self.$refs.video.pause();
            }
          },
        },
      },
      getSources(createElement, this.definition),
    );
  },
};
