import { merge } from 'lodash';
import { elementable } from '@mixins';

export default {
  mixins: [
    elementable,
  ],
  render(createElement) {
    return createElement('v-flex', {
      attrs: merge({
        [`xs${this.definition.width}`]: true,
      }, this.getSchemaAttributes()),
      staticClass: `${this.baseClass} ${this.$options.name}`,
    },
      [
        createElement('div', {
          staticClass: `${this.baseChildrenClass} ${this.$options.name}-items`,
        }, this.renderChildren(createElement)),
      ]);
  },
};
