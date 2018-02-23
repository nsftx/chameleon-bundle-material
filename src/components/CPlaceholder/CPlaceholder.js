import namespace from '@namespace';
import { elementable } from '@mixins';

export default {
  name: `${namespace}placeholder`,
  mixins: [
    elementable,
  ],
  render(createElement) {
    return createElement(
      'router-view',
      {
        staticClass: this.$options.name,
        attrs: self.getSchemaAttributes(),
      },
    );
  },
};
