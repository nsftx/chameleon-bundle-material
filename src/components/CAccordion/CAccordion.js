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

export default {
  extends: Element,
  render(createElement) {
    const data = getProps(this.definition);

    const childrenProps = getItemProps(this.definition);
    const children = _.map(this.definition.elements, element => createElement(
      this.getElementTag('accordion-item'),
      {
        props: {
          definition: _.merge({}, element, childrenProps),
        },
      },
    ));

    return this.renderElement('v-expansion-panel', data, children);
  },
};
