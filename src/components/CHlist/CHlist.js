import namespace from '@namespace';
import { elementable } from '@mixins';

require('../../style/components/_hlist.styl');

export default {
  name: `${namespace}hlist`,
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
          [`${self.$options.name}--spaced`]: self.definition.gutter,
        },
        props: {
          color: self.definition.color,
          flat: self.definition.flat,
        },
        style: {
          backgroundColor: self.definition.color,
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
