import { each, template } from 'lodash';
import { urlValidator } from '@validators';
import Element from '../Element';

const parseImageSrc = (context) => {
  const srcConfig = context.registry.staticAppAssets;
  const srcParams = srcConfig.urlParams;
  let src = `${srcConfig.baseUrl}${srcConfig.appUrl}`;

  each(srcParams, (param, key) => {
    const paramValue = context.getBindingValue(param);
    src = template(src)({ [key]: paramValue });
  });

  return `${src}/${context.config.src}`;
};

const getImageAttrs = (context) => {
  const isUrl = urlValidator(context.config.src);
  const src = isUrl ?
    context.config.src :
    parseImageSrc(context);

  return {
    src,
    title: context.config.title,
    alt: context.config.alternativeText,
  };
};

const renderImage = (createElement, context) => {
  const data = {
    attrs: getImageAttrs(context),
    staticStyle: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    on: {
      click() {
        const payload = context.config.src;
        context.$emit('click', payload);
        context.sendToEventBus('Clicked', {
          payload,
        });
      },
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
