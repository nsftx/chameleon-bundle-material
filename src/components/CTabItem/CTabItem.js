import Element from '../Element';

const getTabItemContent = (context, createElement) => {
  const element = context.config;

  return createElement(
    'v-card',
    {
      attrs: context.getSchemaAttributes(),
      staticStyle: {
        backgroundColor: element.contentColor,
      },
    },
    [
      context.renderChildElement('v-card-text'),
    ],
  );
};

export default {
  extends: Element,
  render(createElement) {
    const data = {
      props: {
        key: this.schema.uid,
        id: String(this.schema.uid),
      },
    };

    const children = getTabItemContent(this, createElement);

    return this.renderElement('v-tab-item', data, children, true);
  },
};
