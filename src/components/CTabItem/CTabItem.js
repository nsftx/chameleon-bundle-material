import namespace from '@namespace';
import { elementable } from '@mixins';

const getTabItemContent = (context, createElement) => {
  const element = context.definition;

  return createElement(
    'v-card',
    {
      staticStyle: {
        backgroundColor: element.contentColor,
      },
    },
    [
      createElement('v-card-text', {
        staticClass: `${context.baseChildrenClass} ${context.$options.name}-items`,
      }, context.renderChildren(createElement)),
    ],
  );
};

export default {
  name: `${namespace}tab-item`,
  mixins: [
    elementable,
  ],
  render(createElement) {
    return createElement(
      'v-tab-item',
      {
        key: this.schema.uid,
        attrs: this.getSchemaAttributes(),
        staticClass: `${this.baseClass} ${this.$options.name}`,
      },
      [getTabItemContent(this, createElement)],
    );
  },
};
