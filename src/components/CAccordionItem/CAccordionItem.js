import Element from '../Element';

const getItemHeader = (element, createElement) => {
  const el = createElement(
    'div',
    {
      slot: 'header',
    },
    element.title,
  );

  return el;
};

const getItemContent = (context, createElement) => {
  const element = context.config;

  const el = createElement(
    'v-card',
    {
      staticStyle: {
        backgroundColor: element.contentColor,
      },
    },
    [
      context.renderChildElement('v-card-text'),
    ],
  );

  return el;
};

export default {
  extends: Element,
  render(createElement) {
    const data = {
      key: this.schema.uid,
      props: this.config,
      staticStyle: {
        backgroundColor: this.config.headerColor,
      },
    };

    const children = [
      getItemHeader(this.config, createElement),
      getItemContent(this, createElement),
    ];

    return this.renderElement('v-expansion-panel-content', data, children);
  },
};
