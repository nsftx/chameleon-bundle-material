import namespace from '@namespace';
import { elementable } from '@mixins';

export default {
  name: `${namespace}panel`,
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
        props: {
          color: self.definition.color,
          flat: self.definition.flat,
        },
        style: {
          backgroundColor: self.definition.color,
          width: self.definition.width,
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
