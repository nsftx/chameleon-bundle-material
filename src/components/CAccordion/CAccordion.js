import { map, merge } from 'lodash';
import Element from '../Element';

const getItemProps = (context) => {
  const { config } = context;

  const props = {
    headerColor: config.color,
    contentColor: config.contentColor,
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
    const { config } = this;
    const childrenProps = getItemProps(this);
    const multiple = [];
    const accordion = map(config.elements, (element, index) => {
      if (this.config.expandAll || element.openOnStart) {
        multiple.push(index);
      }
      return createElement(
        this.getElementTag('accordion-item'),
        {
          props: {
            definition: merge({}, element, childrenProps),
            index,
          },
          attrs: {
            tabIndex: index,
          },
          on: getListeners(this),
        },
      );
    });

    return this.renderElement(
      'v-expansion-panels',
      {
        props: {
          multiple: this.config.leaveOpen,
          dark: this.isThemeDark,
          light: this.isThemeLight,
          [config.alternativeDesign]: true,
          value: multiple,
        },
      },
      accordion,
      true,
    );
  },
};
