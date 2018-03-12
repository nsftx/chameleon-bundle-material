import _ from 'lodash';

export default {
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
      _.each(context.definition.elements, (n, i) => {
        children.push(createElement(
          `${this.$options.namespace}${n.type}`,
          {
            props: {
              definition: n,
            },
            attrs: {
              id: `${n.type}_${i}`,
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
