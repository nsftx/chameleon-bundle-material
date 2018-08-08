import { each, map, isArray, isNil, template } from 'lodash';
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

const getUrlValidator = (item) => {
  if (isNil(item)) return true;
  const src = item.source || item;
  return urlValidator(src);
};

const getGalleryElement = (createElement, context, imageSource) => {
  const carousel = context.config.carousel;

  if (carousel.enabled) {
    const data = {
      props: {
        cycle: carousel.cycle,
        nextIcon: carousel.nextIcon,
        prevIcon: carousel.prevIcon,
        delimiterIcon: carousel.delimiterIcon,
        hideControls: carousel.hideControls,
        hideDelimiters: carousel.hideDelimiters,
        interval: carousel.interval,
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
              src: getUrlValidator(item) ? item.source || item : parseImageSrc(context, item),
            },
          },
        )),
      ]);
  }
  return map(imageSource, (item, i) => createElement(
    'v-flex',
    {
      attrs: {
        [`xs${context.config.gridSize}`]: true,
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
          createElement('v-card-media', {
            attrs: {
              src: getUrlValidator(item) ? item.source || item : parseImageSrc(context, item),
              height: context.config.itemHeight || context.defaultHeight,
            },
          }),
        ]),
    ],
  ));
};

const getImages = (createElement, context) => {
  // TODO refactor this and use diferent methods for imageSource and dataSource
  const items = context.config.imageSource || context.items;
  const imageSource = isArray(items) ? items : [items];

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
      defaultHeight: '100px',
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
