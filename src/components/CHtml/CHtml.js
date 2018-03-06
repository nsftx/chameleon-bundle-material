import { merge } from 'lodash';
import { elementable } from '@mixins';

export default {
  mixins: [
    elementable,
  ],
  render(createElement) {
    return createElement(
      'div',
      {
        attrs: merge({
          class: this.definition.name,
        }, this.getSchemaAttributes()),
        domProps: {
          innerHTML: this.definition.value,
        },
        staticClass: `${this.baseClass} ${this.$options.name}`,
      },
    );
  },
};
