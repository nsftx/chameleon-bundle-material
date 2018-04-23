import { isNil } from 'lodash';
import { fieldable } from '@mixins';
import Element from '../Element';

const getStreamType = (definition) => {
  const type = isNil(definition.streamType) ? 'img' : definition.streamType;
  return type;
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
      getStreamType(this.definition),
      {
        attrs: {
          src: this.registry.isPreviewMode ? null : this.definition.value,
          width: '100%',
          height: '100%',
        },
        staticStyle: {
          position: this.definition.aspectRatio !== 'auto' ? 'absolute' : 'relative',
          top: 0,
          left: 0,
        },
      },
    );

    return this.renderElement('div', data, children);
  },
};
