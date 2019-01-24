import { isObject, isNil, isEmpty } from 'lodash';
import Element from '../Element';

const renderPlaceholder = (createElement, context) => {
  const icon = createElement(
    'v-icon',
    {
      props: { xLarge: true },
    },
    'text_format',
  );

  return context.renderElement('div', {}, [icon]);
};

const renderDivText = (createElement, value, context) => {
  const data = value;
  const divStyle = {
    class: `p${context.config.spacingDirection}-${context.config.spacing} ${context.config.aligment}`,
  };
  const children = [
    createElement(context.textType, data, [context.textValue]),
  ];

  return context.renderElement('div', divStyle, children);
};

export default {
  extends: Element,
  watch: {
    dataSource: {
      handler() {
        this.loadData().then(() => {
          this.value = this.textValue;
        });
      },
      deep: true,
    },
  },
  computed: {
    textValue() {
      if (this.items && this.items.length) {
        return isObject(this.items[0]) ? this.items[0].text : this.items[0];
      }
      return this.config.text;
    },
    textUrlValue() {
      if (this.items && this.items.length) {
        return isObject(this.items[0]) ? this.items[0].url : this.items[0];
      }
      return this.config.urlText;
    },
    textType() {
      return this.config.textStyle || 'span';
    },
  },
  render(createElement) {
    const data = {
      style: {
        fontSize: this.config.textSize,
        color: this.config.color,
      },
      attrs: {
        href: this.textUrlValue,
        target: this.config.target,
      },
    };

    if (isNil(this.textValue) || isEmpty(this.textValue)) {
      return renderPlaceholder(createElement, this);
    }

    if ((this.config.spacingDirection && this.config.spacing) || this.config.aligment) {
      return renderDivText(createElement, data, this);
    }

    return this.renderElement(this.textType, data, [this.textValue]);
  },
};
