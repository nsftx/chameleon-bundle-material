import { each, kebabCase } from 'lodash';
import { elementable } from '@mixins';

export default {
  mixins: [
    elementable,
  ],
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
          this.getElementTag(n.type),
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
        staticClass: `${this.$options.name} ${this.$options.name}-${kebabCase(this.name)}`,
      },
      children,
    );
  },
};
