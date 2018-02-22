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

const getItemContent = (element, createElement) => {
  const definition = element.definition;
  const children = _.map(definition.elements, (childElement) => {
    const childEl = createElement(
      `${namespace}${_.kebabCase(childElement.type)}`,
      {
        key: `${childElement.name}_${uuid()}`,
        props: {
          definition: childElement,
          validators: element.validators,
        },
      },
    );

    return childEl;
  });

  // This will also be child element after we add static text component
  if (definition.text && definition.text.length) {
    const itemText = getItemText(definition.text, createElement);
    children.unshift(itemText);
  }

  const el = createElement(
    'v-card',
    {
      staticStyle: {
        backgroundColor: definition.contentColor,
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
