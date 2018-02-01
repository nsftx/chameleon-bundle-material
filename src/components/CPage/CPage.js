import _ from 'lodash';
import namespace from '@namespace';

export default {
  name: `${namespace}page`,
  props: {
    definition: {
      type: Object,
      required: true,
    },
    validators: {
      type: Object,
    },
  },
  render(createElement) {
    const context = this;
    const children = [];

    if (context.definition.elements) {
      _.each(context.definition.elements, (n) => {
        children.push(createElement(
          `${namespace}${n.type}`,
          {
            props: {
              definition: n,
              validators: context.validators,
            },
          },
          children,
        ));
      });
    }

    return createElement(
      'div',
      {
        staticClass: `${context.$options.name} ${context.$options.name}-${_.kebabCase(context.definition.name)}`,
      },
      children,
    );
  },
};
