import _ from 'lodash';
import uuid from 'uuid/v4';
import namespace from '@namespace';

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
  props: {
    definition: {
      type: Object,
      required: true,
    },
    validators: {
      type: Object,
    },
  },
  render(createElement) {
    return createElement(
      'v-expansion-panel-content',
      {
        staticStyle: {
          backgroundColor: this.definition.headerColor,
        },
        props: this.definition,
      },
      [
        getItemHeader(this.definition, createElement),
        getItemContent(this, createElement),
      ],
    );
  },
};
