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
    alt: context.config.alternativeText,
    height: context.config.height,
    width: context.config.width,
    contain: context.config.contain,
  };
};

const renderImage = (createElement, context) => {
  const data = {
    attrs: getImageAttrs(context),
    staticStyle: {},
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

  return createElement('v-img', data);
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
  render(createElement) {
    const data = {
      props: {
        dark: this.isThemeDark,
        light: this.isThemeLight,
        color: this.config.color,
        flat: true,
      },
      staticStyle: {
        width: this.config.width,
        height: this.config.height,
      },
    };
    const child = this.config.src ?
      renderImage(createElement, this) :
      renderPlaceholder(createElement, this);

    return this.renderElement('v-card', data, child);
  },
};
