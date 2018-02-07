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

const getItemContent = (element, createElement, color) => {
  const children = _.map(element.elements, (childElement) => {
    const childEl = createElement(
      `${namespace}${_.kebabCase(childElement.type)}`,
      {
        key: `${childElement.name}_${uuid()}`,
        props: {
          definition: childElement,
          validators: self.validators,
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
        backgroundColor: color,
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

const getItem = (element, createElement, props) => {
  const el = createElement(
    'v-expansion-panel-content',
    {
      staticStyle: {
        backgroundColor: props.headerColor,
      },
      props,
    },
    [
      getItemHeader(element, createElement),
      getItemContent(element, createElement, props.contentColor),
    ],
  );

  return el;
};

const getItemProps = (context) => {
  const props = {
    headerColor: context.color,
    contentColor: context.contentColor,
    ripple: context.contentRipple,
    hideActions: context.hideItemActions,
  };

  return props;
};

const getProps = (context) => {
  const props = {
    expand: context.multipleExpand,
  };

  if (context.alternativeDesign) {
    props[context.alternativeDesign] = true;
  }

  return { props };
};

export default {
  name: `${namespace}accordion`,
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
    const itemProps = getItemProps(this.definition);

    const items = _.map(this.definition.elements, element => getItem(
      element,
      createElement,
      itemProps,
    ));

    return createElement(
      'v-expansion-panel',
      getProps(this.definition),
      items,
    );
  },
};
