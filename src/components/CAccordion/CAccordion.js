import _ from 'lodash';
import Element from '../Element';

const getItemProps = (context) => {
  const props = {
    headerColor: context.color,
    contentColor: context.contentColor,
    ripple: context.contentRipple,
    hideActions: context.hideItemActions,
  };

  return props;
};

const getProps = (context) => {
  const props = {
    expand: context.multipleExpand,
  };

  if (context.alternativeDesign) {
    props[context.alternativeDesign] = true;
  }

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
    const data = getProps(this.config);

    const childrenProps = getItemProps(this.config);
    const children = _.map(this.config.elements, (element, index) => createElement(
      this.getElementTag('accordion-item'),
      {
        props: {
          definition: _.merge({}, element, childrenProps),
        },
        attrs: {
          tabIndex: index,
        },
        on: getListeners(this),
      },
    ));

    return this.renderElement('v-expansion-panel', data, children);
  },
};
