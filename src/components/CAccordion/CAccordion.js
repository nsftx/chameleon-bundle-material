import _ from 'lodash';
import namespace from '@namespace';
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
  name: `${namespace}accordion`,
  mixins: [
    elementable,
  ],
  render(createElement) {
    const itemProps = getItemProps(this.definition);

    const items = _.map(this.definition.elements, element => createElement(
      `${namespace}accordion-item`,
      {
        key: this.schema.uid,
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
