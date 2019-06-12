import { isObject } from 'lodash';
import Element from '../Element';

export default {
  extends: Element,
  watch: {
    dataSource: {
      handler() {
        this.loadData();
      },
      deep: true,
    },
  },
  computed: {
    textValue() {
      const val = this.getItemValue('text').join(',').replace(/,/g, '\n');
      return val;
    },
    textLinkValue() {
      return this.getItemValue('link');
    },
    textType() {
      return this.config.textStyle || 'pre';
    },
  },
  methods: {
    getItemValue(type) {
      if (this.items && this.items.length) {
        return isObject(this.items[0]) ? this.items[0][type] : this.items[0];
      }
      return this.config[type];
    },
    renderPlaceholder() {
      const icon = this.$createElement(
        'v-icon',
        {
          props: { xLarge: true },
        },
        'text_format',
      );

      return this.renderElement('div', {}, [icon]);
    },
    renderParagraphText(value) {
      const data = value;
      const divStyle = {
        class: `p${this.config.spacingDirection}-${this.config.spacing} ${this.config.aligment}`,
      };
      const children = [
        this.$createElement(this.textType, data, [this.textValue]),
      ];

      return this.renderElement('div', divStyle, children);
    },
  },
  render() {
    const data = {
      style: {
        fontSize: this.config.textSize,
        color: this.config.color,
      },
      attrs: {
        href: this.textLinkValue,
        target: this.config.target,
      },
    };

    if (!this.textValue || !this.textValue.length) {
      return this.renderPlaceholder();
    }

    if ((this.config.spacingDirection && this.config.spacing) || this.config.aligment) {
      return this.renderParagraphText(data);
    }

    return this.renderElement(this.textType, data, [this.textValue]);
  },
};
