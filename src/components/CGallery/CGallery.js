import { each, map, isNil, template } from 'lodash';
import { urlValidator } from '@validators';
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

const getUrlValidator = (item) => {
  if (isNil(item)) return true;
  const src = item.image || item.thumb || item;
  return urlValidator(src);
};

const getCarouselSource = item => item.image || item.thumb || item;
const getGallerySource = item => item.thumb || item.image || item;

const getCloseBtnOverlay = (createElement, context) => {
  const enabled = context.config.carousel.enabled;
  if (!enabled) {
    return createElement('v-btn', {
      props: {
        flat: true,
        dark: true,
      },
      staticClass: 'pa-0 ma-0',
      style: {
        position: 'absolute',
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
  const carousel = self.config.carousel;
  const active = self.active || (self.config.carousel && self.config.carousel.enabled);

  if (active) {
    const data = {
      props: {
        cycle: carousel.cycle,
        nextIcon: carousel.nextIcon,
        prevIcon: carousel.prevIcon,
        delimiterIcon: carousel.delimiterIcon,
        hideControls: carousel.hideControls,
        hideDelimiters: carousel.hideDelimiters,
        interval: carousel.interval,
        value: self.target,
      },
    };
    return createElement('v-carousel',
      data,
      [
        map(imageSource, (item, i) => createElement(
          'v-carousel-item',
          {
            attrs: {
              key: i,
              src: getUrlValidator(item) ?
                getCarouselSource(item) : parseImageSrc(context, item),
            },
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
      props: {
        key: i,
      },
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
              src: getUrlValidator(item) ? getGallerySource(item) : parseImageSrc(context, item),
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
  const imageSource = context.config.imageSource && context.config.imageSource.length ?
    context.config.imageSource : context.items;

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
  data() {
    return {
      items: [],
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
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadConnectorData().then((result) => {
        this.items = result.items || [];
        this.sendToEventBus('DataSourceChanged', this.items);
      });
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
      ]);

    return this.renderElement('v-card', data, children);
  },
};
