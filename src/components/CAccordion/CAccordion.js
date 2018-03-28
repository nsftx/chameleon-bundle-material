import _ from 'lodash';
import { elementable } from '@mixins';

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
  mixins: [
    elementable,
  ],
  render(createElement) {
    const itemProps = getItemProps(this.definition);
    const items = _.map(this.definition.elements, element => createElement(
      this.getElementTag('accordion-item'),
      {
        props: {
          definition: _.merge({}, element, itemProps),
        },
      },
    ));

    return createElement(
      'v-expansion-panel',
      {
        attrs: this.getSchemaAttributes(),
        props: getProps(this.definition),
        staticClass: `${this.baseClass} ${this.$options.name}`,
      },
      items,
    );
  },
};
