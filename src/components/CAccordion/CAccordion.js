import { map, merge } from 'lodash';
import Element from '../Element';

const getItemProps = (context) => {
  const config = context.config;

  const props = {
    headerColor: config.color,
    contentColor: config.contentColor,
    ripple: config.contentRipple,
    hideActions: config.hideItemActions,
  };

  return props;
};

const getListeners = (context) => {
  const listeners = {
    change(value) {
      context.sendToEventBus('SelectedItemChanged', value);
    },
  };
  return listeners;
};

export default {
  extends: Element,
  render(createElement) {
    const config = this.config;
    const childrenProps = getItemProps(this);
    const accordion = map(config.elements, (element, index) => createElement(
      this.getElementTag('accordion-item'),
      {
        props: {
          definition: merge({}, element, childrenProps),
        },
        attrs: {
          tabIndex: index,
        },
        on: getListeners(this),
      },
    ));

    return this.renderElement(
      'v-expansion-panel',
      {
        props: {
          expand: config.multipleExpand,
          dark: this.isThemeDark,
          light: this.isThemeLight,
          [config.alternativeDesign]: true,
        },
      },
      accordion,
      true,
    );
  },
};
