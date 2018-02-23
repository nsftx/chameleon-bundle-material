import { merge } from 'lodash';
import namespace from '@namespace';
import { elementable } from '@mixins';

export default {
  name: `${namespace}html`,
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
