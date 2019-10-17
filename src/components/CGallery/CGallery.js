import {
  each, map, isNil, template,
} from 'lodash';
import { validatable } from '@/mixins';
import { urlValidator } from '@/validators';
import Element from '../Element';

const parseImageSrc = (context, item) => {
  const srcConfig = context.registry.staticAppAssets;
  const srcParams = srcConfig.urlParams;
  let src = `${srcConfig.baseUrl}${srcConfig.appUrl}`;

  each(srcParams, (param, key) => {
    const paramValue = context.getBindingValue(param);
    src = template(src)({ [key]: paramValue });
  });

  return `${src}/${item}`;
};

const toggleCarousel = (context, value) => {
  const self = context;
  self.active = value;
};

const getValue = value => (isNil(value) || value === false ? '' : `${value}`);

const getUrlValidator = (context, item) => {
  if (isNil(item)) return true;
  const src = item.image || item.thumb || item;
  return urlValidator(context.validators.isUrl, getValue(src));
};

const getCarouselSource = item => item.image || item.thumb || item;
const getGallerySource = item => item.thumb || item.image || item;

const getCloseBtnOverlay = (createElement, context) => {
  const { enabled } = context.config.carousel;
  if (!enabled) {
    return createElement('v-btn', {
      props: {
        flat: true,
      },
      staticClass: 'pa-0 ma-0',
      style: {
        position: 'absolute',
        backgroundColor: 'transparent !important',
        width: '100%',
        height: '100%',
        top: 0,
      },
      on: {
        click() {
          toggleCarousel(context, false);
        },
      },
    });
  }
  return false;
};

const getGalleryElement = (createElement, context, imageSource) => {
  const self = context;
  const { carousel } = self.config;
  const active = self.active || (self.config.carousel && self.config.carousel.enabled);

  if (active) {
    const data = {
      props: {
        cycle: carousel.cycle,
        nextIcon: carousel.nextIcon,
        prevIcon: carousel.prevIcon,
        delimiterIcon: carousel.delimiterIcon,
        showArrows: carousel.showControls,
        hideDelimiters: carousel.hideDelimiters,
        hideDelimiterBackground: carousel.hideDelimiters,
        interval: carousel.interval,
        value: self.target,
        dark: self.isThemeDark,
        light: self.isThemeLight,
      },
    };
    return createElement('v-carousel',
      data,
      [
        map(imageSource, (item, i) => createElement(
          'v-carousel-item',
          {
            attrs: {
              src: getUrlValidator(context, item) === true
                ? getCarouselSource(item) : parseImageSrc(context, item),
            },
            key: i,
          },
        )),
        getCloseBtnOverlay(createElement, self),
      ]);
  }
  return map(imageSource, (item, i) => createElement(
    'v-flex',
    {
      attrs: {
        [`xs${context.config.gallery.gridSize}`]: true,
      },
      key: i,
    },
    [
      createElement('v-card', {
        props: {
          flat: true,
          tile: true,
        },
      },
      [
        createElement('v-img', {
          attrs: {
            id: `img-${i}`,
            alt: '',
            src: getUrlValidator(context, item) === true
              ? getGallerySource(item) : parseImageSrc(context, item),
            height: context.config.gallery.itemHeight,
            contain: context.config.gallery.contain,
          },
          style: {
            cursor: 'pointer',
          },
          on: {
            click(e) {
              self.target = Number(e.target.parentElement.id.split('-')[1]);
              toggleCarousel(context, true);
            },
          },
        }),
      ]),
    ],
  ));
};

const getImages = (createElement, context) => {
  const imageSource = context.config.imageSource && context.config.imageSource.length
    ? context.config.imageSource : context.items;

  if (!isNil(imageSource && imageSource.length > 0)) {
    return createElement('v-layout',
      {
        attrs: {
          row: true,
          wrap: true,
        },
      },
      [
        getGalleryElement(createElement, context, imageSource),
      ]);
  }
  return [];
};

export default {
  extends: Element,
  mixins: [
    validatable,
  ],
  data() {
    return {
      target: 0,
      active: false,
    };
  },
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
    };
    const children = createElement(
      'v-container',
      {
        attrs: {
          [`grid-list-${this.config.contentSpacing}`]: true,
          fluid: this.config.gridMaxSize,
        },
      },
      [
        getImages(createElement, this),
      ],
    );

    return this.renderElement('v-card', data, children);
  },
};
