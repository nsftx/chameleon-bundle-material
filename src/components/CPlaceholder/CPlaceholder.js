import namespace from '@namespace';
import { elementable } from '@mixins';

export default {
  name: `${namespace}placeholder`,
  mixins: [
    elementable,
  ],
  render(createElement) {
    const children = [
      createElement(
        'router-view',
      ),
    ];

    return createElement('div', {
      attrs: this.getSchemaAttributes(),
      staticClass: `${this.baseClass} ${this.$options.name}`,
    }, children);
  },
};
