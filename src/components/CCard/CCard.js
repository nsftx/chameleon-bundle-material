
import { map, startsWith } from 'lodash';
import BaseCard from '../BaseCard';

require('../../style/components/_card.scss');

const createIndicator = (context) => {
  if (startsWith(context.indicatorColor, '#')) {
    return context.$createElement('span', {
      class: ['c-card__indicator'],
      style: {
        backgroundColor: context.indicatorColor,
      },
    });
  }
  return context.$createElement('span', {
    class: ['c-card__indicator', [context.indicatorColor]],
  });
};

const createTitle = context => context.$createElement('div', {
  class: 'subheading c-card__title',
}, [
  context.$createElement('span', context.title),
  createIndicator(context),
]);

const createSubTitle = context => context.$createElement('p', {
  class: 'caption c-card__subtitle',
}, context.subtitle);

const createThumbnail = (context) => {
  if (context.thumbnailImage) {
    return context.$createElement('c-image', {
      props: {
        unselectable: true,
        definition: {
          src: context.thumbnailImage,
          width: '60px',
          height: '60px',
        },
      },
      class: 'mr-3 c-card__image',
    });
  } if (context.thumbnailIcon) {
    return context.$createElement('v-icon', {
      props: {
        left: true,
        large: true,
      },
      class: 'mr-3 c-card__icon',
    }, context.thumbnailIcon);
  }
  return null;
};

const createStatus = (context) => {
  const statusIcon = !context.statusIcon ? null
    : context.$createElement('v-icon', {
      props: {
        small: true,
      },
    }, context.statusIcon);

  const statusText = context.$createElement('span', context.statusText);

  return context.$createElement('div', {
    class: 'caption c-card__status',
  }, [statusIcon, statusText]);
};

const createHeader = context => context.$createElement(
  'v-card-title', {
    class: 'font-weight-medium px-3 py-2',
  },
  [
    context.$createElement('div', {
      class: 'v-card__title pa-0',
    }, [
      createThumbnail(context),
      context.$createElement('div', {
        class: 'c-card__header-text',
      }, [
        createTitle(context),
        createSubTitle(context),
        createStatus(context),
      ]),
    ]),
    context.$createElement('v-spacer'),
    context.$createElement('v-icon', {
      class: 'c-card__menu text-xs-right',
    }, 'more_vert'),
  ],
);

const createImage = (context) => {
  if (!context.image) return null;
  return context.$createElement('c-image', {
    props: {
      unselectable: true,
      definition: {
        src: context.image,
        width: context.config.imageWidth || '100%',
        height: context.config.imageHeight || '100%',
      },
    },
  });
};

const createCardLayout = (context) => {
  if (context.config.variation === 'header') {
    return [
      createHeader(context),
      createImage(context),
    ];
  }
  return [
    createImage(context),
    createHeader(context),
  ];
};

export default {
  extends: BaseCard,
  computed: {
    indicatorColor() {
      return this.getOptionDataSource('indicatorColor');
    },
    image() {
      return this.getOptionDataSource('image');
    },
    title() {
      return this.getOptionDataSource('title');
    },
    subtitle() {
      return this.getOptionDataSource('subtitle');
    },
    thumbnailIcon() {
      return this.getOptionDataSource('icon');
    },
    thumbnailImage() {
      return this.getOptionDataSource('thumb');
    },
    statusIcon() {
      return this.getOptionDataSource('statusIcon');
    },
    statusText() {
      return this.getOptionDataSource('statusText');
    },
  },
  methods: {
    // Move to BaseCard ??
    createBody() {
      return this.$createElement(
        'div',
        {
          staticClass: `${this.$options.name} ${this.baseChildrenClass}`,
        }, map(this.config.elements, element => this.$createElement(
          this.getElementTag(element.type), {
            staticClass: `${this.$options.name}-item`,
            props: {
              definition: element,
            },
          },
        )),
      );
    },
    createFooter() {
      return this.$createElement('v-card-actions');
    },
  },
  render() {
    return this.createCard([
      createCardLayout(this),
      this.createBody(),
      // TODO enble when we add someting to footer
      // this.createFooter(),
    ]);
  },
};
