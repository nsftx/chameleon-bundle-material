import { each, isNil, template } from 'lodash';
import { validatable } from '@mixins';
import { urlValidator } from '@validators';
import Element from '../Element';

const parseImageSrc = (context, image) => {
  const srcConfig = context.registry.staticAppAssets;
  const srcParams = srcConfig.urlParams;
  let src = `${srcConfig.baseUrl}${srcConfig.appUrl}`;

  each(srcParams, (param, key) => {
    const paramValue = context.getBindingValue(param);
    src = template(src)({ [key]: paramValue });
  });

  return `${src}/${image}`;
};

const getValue = value => (isNil(value) || value === false ? '' : `${value}`);

const getImageAttrs = (context) => {
  const config = context.config;
  const imageSrc = context.items ? context.items[0].url : config.src;
  if (isNil(imageSrc) || imageSrc.length === 0) return null;

  const isUrl = urlValidator(context.validators.isUrl, getValue(imageSrc));
  const src = isUrl === true ? imageSrc : parseImageSrc(context, imageSrc);

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
  mixins: [
    validatable,
  ],
  watch: {
    dataSource: {
      handler() {
        this.loadData();
      },
      deep: true,
    },
  },
  render(createElement) {
    const data = {
      props: {
        dark: this.isThemeDark,
        light: this.isThemeLight,
        color: this.config.color,
        flat: true,
      },
      staticStyle: {
        width: this.config.width || '40px',
        height: this.config.height || '40px',
      },
    };
    const child = this.config.src || (this.items && this.items.length) ?
      renderImage(createElement, this) :
      renderPlaceholder(createElement, this);

    if (this.unselectable) {
      return createElement('v-card', data, [child]);
    }

    return this.renderElement('v-card', data, child);
  },
};
