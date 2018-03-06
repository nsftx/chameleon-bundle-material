import { elementable } from '@mixins';

export default {
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
