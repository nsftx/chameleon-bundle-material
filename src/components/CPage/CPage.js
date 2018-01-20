import _ from 'lodash';

export default {
  name: 'c-page',
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
          `c-${n.type}`,
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
      'v-container',
      {
        staticClass: `c-page c-page-${_.kebabCase(context.definition.name)}`,
      },
      children,
    );
  },
};
