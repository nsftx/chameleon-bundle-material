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
  props: {
    ordinal: {
      type: Number,
    },
  },
  render(createElement) {
    const self = this;
    const data = {
      key: `${self.ordinal}-${self.schema.uid}`,
      props: {
        value: `tab-${self.ordinal}`,
        id: `tab-${self.ordinal}`,
      },
    };
    const children = getTabItemContent(this, createElement) || [];

    return this.renderElement('v-tab-item', data, children, true);
  },
};
