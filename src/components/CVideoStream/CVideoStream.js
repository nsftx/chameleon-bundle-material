import { isNil } from 'lodash';
import namespace from '@namespace';
import { elementable, fieldable } from '@mixins';

const getStreamType = (definition) => {
  const type = isNil(definition.streamType) ? 'img' : definition.streamType;
  return type;
};

const getStaticStyle = (definition) => {
  let height = 'auto';
  let paddingTop = 0;

  if (definition.aspectRatio !== 'auto') {
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
  name: `${namespace}video-stream`,
  mixins: [
    elementable,
    fieldable,
  ],
  render(createElement) {
    return createElement(
      'div',
      {
        staticClass: `${this.baseClass} ${this.$options.name}`,
        staticStyle: getStaticStyle(this.definition),
      },
      [
        createElement(
          getStreamType(this.definition),
          {
            attrs: {
              src: this.definition.value,
              width: '100%',
              height: '100%',
            },
            staticStyle: {
              position: this.definition.aspectRatio !== 'auto' ? 'absolute' : 'relative',
              top: 0,
              left: 0,
            },
          },
        ),
      ],
    );
  },
};
