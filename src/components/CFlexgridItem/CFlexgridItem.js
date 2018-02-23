import { merge } from 'lodash';
import namespace from '@namespace';
import { elementable } from '@mixins';

export default {
  name: `${namespace}flexgrid-item`,
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
