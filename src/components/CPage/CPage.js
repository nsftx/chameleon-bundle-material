import { each, kebabCase } from 'lodash';

export default {
  props: {
    definition: {
      type: Object,
      required: true,
    },
  },
  computed: {
    elements() {
      return this.definition.elements;
    },
    name() {
      return this.definition.name;
    },
  },
  render(createElement) {
    const children = [];

    if (this.elements) {
      each(this.elements, (n, i) => {
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
        staticClass: `
          ${this.$options.name} 
          ${this.$options.name}-${kebabCase(this.name)}
        `,
      },
      children,
    );
  },
};
