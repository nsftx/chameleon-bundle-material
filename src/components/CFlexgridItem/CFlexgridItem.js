import Element from '../Element';

export default {
  extends: Element,
  render(createElement) {
    const data = {
      attrs: {
        [`xs${this.definition.width}`]: true,
      },
    };

    const children = createElement('div',
      {
        staticClass: `${this.baseChildrenClass} ${this.$options.name}-items`,
      },
      this.renderChildren(createElement));

    return this.renderElement('v-flex', data, children);
  },
};
