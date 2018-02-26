import namespace from '@namespace';
import { elementable } from '@mixins';

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

  return el;
};

export default {
  name: `${namespace}accordion-item`,
  mixins: [
    elementable,
  ],
  render(createElement) {
    return createElement(
      'v-expansion-panel-content',
      {
        key: this.schema.uid,
        props: this.definition,
        staticClass: `${this.baseClass} ${this.$options.name}`,
        staticStyle: {
          backgroundColor: this.definition.headerColor,
        },
      },
      [
        getItemHeader(this.definition, createElement),
        getItemContent(this, createElement),
      ],
    );
  },
};
