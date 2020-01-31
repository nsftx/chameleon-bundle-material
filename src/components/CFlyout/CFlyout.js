import Element from '../Element';

require('../../style/components/_flyout.scss');

const createHeader = context => context.$createElement(
  'div',
  {
    class: ['c-flyout__header'],
  },
  [
    context.$createElement(
      'div',
      {
        class: ['c-flyout__header__avatar'],
      },
    ),
    context.$createElement(
      'span',
      {
        class: ['c-flyout__header__title'],
      },
      context.title,
    ),
    context.$createElement(
      'v-btn',
      {
        class: ['c-flyout__header__more'],
      },
      [
        context.$createElement(
          'v-icon',
          {
            class: ['c-flyout__header__more__icon'],
          },
          'more_vert',
        ),
      ],
    ),
    context.$createElement(
      'v-btn',
      {
        class: ['c-flyout__header__close'],
        on: {
          click: this.closeFlyout(),
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

const createFooter = context => context.$createElement(
  'div',
  {
    class: ['c-flyout__footer'],
  },
);

export default {
  extends: Element,
  render() {
    const data = {
      dialog: true,
      // props: {
      //   dark: this.isThemeDark,
      //   light: this.isThemeLight,
      //   contentClass: ['c-flyout'],
      //   fullscreen:
      //   maxWidth:
      //   peristent:
      //   scrollable:
      //   hideOverlay:
      //   title:
      // },
    };
    const elements = [createHeader(this), createFooter(this)];


    return this.renderElement('v-dialog', data, elements);
  },
};
