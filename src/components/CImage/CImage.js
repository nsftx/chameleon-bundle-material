import { urlValidator } from '@validators';
import Element from '../Element';

const renderImage = (createElement, context) => {
  const isUrl = urlValidator(context.config.src);
  const src = isUrl ? context.config.src :
    `${context.registry.staticAssetsPath}/${context.config.src}`;

  const data = {
    attrs: {
      src,
    },
    staticStyle: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
  };

  if (context.hasWidth) data.staticStyle.width = context.width;
  if (context.hasHeight) data.staticStyle.height = context.height;

  return createElement('img', data);
};

const renderPlaceholder = (createElement, context) => {
  const data = {
    staticStyle: {
      width: context.width,
      height: context.height,
    },
  };

  const icon = createElement(
    'v-icon',
    {
      props: { xLarge: true },
      staticStyle: data.staticStyle,
    },
    'image',
  );

  return createElement('div', data, [icon]);
};

export default {
  extends: Element,
  computed: {
    hasWidth() {
      return !!this.config.width;
    },
    hasHeight() {
      return !!this.config.height;
    },
    width() {
      return this.config.width || '120px';
    },
    height() {
      return this.config.height || '120px';
    },
  },
  render(createElement) {
    const child = this.config.src ?
      renderImage(createElement, this) :
      renderPlaceholder(createElement, this);

    return this.renderElement('div', {}, child);
  },
};
