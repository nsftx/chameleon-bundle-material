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
  extends: Element,
  render(createElement) {
    const data = {
      key: this.schema.uid,
      props: this.definition,
      staticStyle: {
        backgroundColor: this.definition.headerColor,
      },
    };

    const children = [
      getItemHeader(this.definition, createElement),
      getItemContent(this, createElement),
    ];

    return this.renderElement('v-expansion-panel-content', data, children);
  },
};
