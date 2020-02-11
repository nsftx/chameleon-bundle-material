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
      'v-btn',
      {
        class: ['c-flyout__header__more'],
        props: {
          icon: true,
        },
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
            context.$emit('toggleFlyout');
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
        class: ['c-flyout__footer__close'],
        props: {
          text: true,
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
      },
      context.config.submitLabel,
    ),
  ],
);

const createBody = context => context.$createElement(
  'div',
  {
    class: ['c-flyout__body'],
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
  [createHeader(context), createBody(context), createFooter(context)],
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
        contentClass: 'c-flyout',
        fullscreen: this.config.fullscreen,
        width: this.config.width,
        peristent: this.config.peristent,
        scrollable: this.config.scrollable,
        hideOverlay: this.config.hideOverlay,
      },
      on: {
        'click:outside': () => {
          this.$emit('toggleFlyout');
        },
      },
    };
    const elements = createCard(this);

    return this.renderElement('v-dialog', data, elements);
  },
};
