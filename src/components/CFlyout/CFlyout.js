import Element from '../Element';

require('../../style/components/_flyout.scss');

const renderAvatar = (context) => {
  if (context.config.showAvatar) {
    context.$createElement(
      'div',
      {
        class: ['c-flyout__header__avatar'],
      },
    );
  }
};

const createHeader = context => context.$createElement(
  'v-toolbar',
  {
    class: ['c-flyout__header'],
  },
  [
    renderAvatar(context),
    context.$createElement(
      'v-toolbar-title',
      {
        class: ['c-flyout__header__title'],
      },
      context.config.headerTitle,
    ),
    context.$createElement('v-spacer'),
    context.$createElement(
      'div',
      {
        class: ['c-flyout__header__menu'],
      },
      context.$slots.menu,
    ),
    context.$createElement(
      'v-btn',
      {
        class: ['c-flyout__header__close'],
        props: {
          icon: true,
        },
        nativeOn: {
          click() {
            context.$emit('Closed');
          },
        },
      },
      [
        context.$createElement(
          'v-icon',
          {
            class: ['c-flyout__header__close__icon'],
          },
          'close',
        ),
      ],
    ),
  ],
);

const createFooter = context => context.$slots.footer || context.$createElement(
  'v-card-actions',
  {
    class: ['c-flyout__footer'],
  },
  [
    context.$createElement(
      'v-btn',
      {
        class: ['c-flyout__footer__cancel'],
        props: {
          text: true,
        },
        nativeOn: {
          click() {
            context.$emit('Canceled');
          },
        },
      },
      context.config.cancelLabel,
    ),
    context.$createElement(
      'v-btn',
      {
        class: ['c-flyout__footer__submit'],
        props: {
          depressed: true,
        },
        nativeOn: {
          click() {
            context.$emit('Submitted');
          },
        },
      },
      context.config.submitLabel,
    ),
  ],
);

const createBody = context => context.$createElement(
  'div',
  {
    class: {
      'c-flyout__body': true,
      'c-flyout__actionless': !context.config.showActions,
    },
    staticClass: context.baseChildrenClass,
  },
  context.$slots.content,
);

const createCard = context => context.$createElement(
  'v-card',
  {
    class: ['c-flyout__card'],
    props: {
      tile: true,
    },
  },
  [
    createHeader(context),
    createBody(context),
    context.config.showActions ? createFooter(context) : null,
  ],
);

export default {
  extends: Element,
  render() {
    const data = {
      props: {
        value: this.config.value,
        transition: false,
        dark: this.isThemeDark,
        light: this.isThemeLight,
        contentClass: this.config.fullscreen ? 'c-flyout' : 'c-flyout c-flyout__full-height',
        fullscreen: this.config.fullscreen,
        width: this.config.width,
        persistent: this.config.persistent,
        noClickAnimation: true,
        scrollable: this.config.scrollable,
        hideOverlay: this.config.hideOverlay,
      },
      on: {
        'click:outside': () => {
          if (!this.config.persistent) this.$emit('Closed');
        },
      },
    };
    const elements = createCard(this);

    return this.renderElement('v-dialog', data, elements);
  },
};
