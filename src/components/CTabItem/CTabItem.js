import Element from '../Element';

const getTabItemContent = (context, createElement) => {
  const element = context.definition;

  return createElement(
    'v-card',
    {
      attrs: context.getSchemaAttributes(),
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
  extends: Element,
  render(createElement) {
    const data = {
      key: this.schema.uid,
    };

    const children = getTabItemContent(this, createElement);

    return this.renderElement('v-tab-item', data, children);
  },
};
