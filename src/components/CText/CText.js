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
    spacingDirection() {
      if (isNil(this.config.spacingDirection) && !isNil(this.config.spacing)) {
        return 'a';
      }
      return this.config.spacingDirection;
    },
  },
  render(createElement) {
    const data = {
      style: {
        fontSize: this.config.textSize,
        color: this.config.color,
      },
      class: this.config.aligment,
      attrs: {
        href: this.textUrlValue,
        target: this.config.target,
      },
    };

    if (isNil(this.textValue) || isEmpty(this.textValue)) {
      return renderPlaceholder(createElement, this);
    }

    if (this.spacingDirection && this.config.spacing) {
      const divStyle = {
        class: `p${this.spacingDirection}-${this.config.spacing} ${this.config.aligment}`,
      };
      const children = [
        createElement(this.textType, data, [this.textValue]),
      ];

      return this.renderElement('div', divStyle, children);
    }

    return this.renderElement(this.textType, data, [this.textValue]);
  },
};
