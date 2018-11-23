import Element from '../Element';

const getTabItemContent = (context, createElement) => createElement(
  'v-card',
  {
    props: {
      flat: true,
      color: context.config.contentColor,
    },
  },
  [
    context.renderChildElement('v-card-text'),
  ],
);

export default {
  extends: Element,
  render(createElement) {
    const data = {
      key: this.schema.uid,
    };

    const children = getTabItemContent(this, createElement);

    return this.renderElement('v-tab-item', data, children, true);
  },
};
