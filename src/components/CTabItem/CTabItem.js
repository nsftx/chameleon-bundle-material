import namespace from '@namespace';
import { elementable } from '@mixins';

const getTabItemContent = (context, createElement) => {
  const element = context.definition;

  const el = createElement(
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

  return el;
};

export default {
  name: `${namespace}tab-item`,
  mixins: [
    elementable,
  ],
  render(createElement) {
    return createElement(
      'v-tab-item',
      getTabItemContent(this, createElement),
    );
  },
};
