import { elementable } from '@mixins';

require('../../style/components/_vlist.styl');

export default {
  mixins: [
    elementable,
  ],
  render(createElement) {
    const self = this;

    return createElement(
      'v-card',
      {
        key: self.schema.uid,
        attrs: self.getSchemaAttributes(),
        class: {
          [`${this.$options.name}--spaced`]: this.definition.gutter,
        },
        props: {
          color: this.definition.color,
          flat: this.definition.flat,
        },
        style: {
          backgroundColor: this.definition.color,
        },
        staticClass: `${self.baseClass} ${self.$options.name}`,
      },
      [
        createElement('div', {
          staticClass: `${self.baseChildrenClass} ${self.$options.name}-items`,
        }, self.renderChildren(createElement)),
      ],
    );
  },
};
