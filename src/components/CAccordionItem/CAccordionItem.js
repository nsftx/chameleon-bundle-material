import _ from 'lodash';
import uuid from 'uuid/v4';
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

const getItemText = (text, createElement) => {
  const el = createElement(
    'p',
    text,
  );

  return el;
};

const getItemContent = (context, createElement) => {
  const element = context.definition;
  const children = _.map(element.elements, (childElement) => {
    const childEl = createElement(
      `${namespace}${_.kebabCase(childElement.type)}`,
      {
        key: `${childElement.name}_${uuid()}`,
        props: {
          definition: childElement,
        },
      },
    );

    return childEl;
  });

  // This will also be child element after we add static text component
  if (element.text && element.text.length) {
    const itemText = getItemText(element.text, createElement);
    children.unshift(itemText);
  }

  const el = createElement(
    'v-card',
    {
      staticStyle: {
        backgroundColor: element.contentColor,
      },
    },
    [
      createElement(
        'v-card-text',
        {},
        children,
      ),
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
        attrs: this.getSchemaAttributes(),
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
