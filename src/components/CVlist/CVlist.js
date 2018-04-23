import Element from '../Element';

require('../../style/components/_vlist.styl');

export default {
  extends: Element,
  render(createElement) {
    const data = {
      key: this.schema.uid,
      class: {
        [`${this.$options.name}--spaced`]: this.definition.gutter,
      },
      props: {
        color: this.definition.color,
        flat: this.definition.flat,
      },
      style: {
        backgroundColor: this.definition.color,
      },
    };

    const children = createElement('div', {
      staticClass: `${this.baseChildrenClass} ${this.$options.name}-items`,
    }, this.renderChildren(createElement));

    return this.renderElement('v-card', data, children);
  },
};
