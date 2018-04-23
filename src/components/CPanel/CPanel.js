import Element from '../Element';

export default {
  extends: Element,
  render(createElement) {
    const definition = this.definition;

    const data = {
      key: this.schema.uid,
      props: {
        color: this.getBindingValue(definition.color),
        flat: definition.flat,
      },
      style: {
        width: definition.width,
      },
    };

    const children = createElement('div', {
      staticClass: `${this.baseChildrenClass} ${this.$options.name}-items`,
    }, this.renderChildren(createElement));

    return this.renderElement('v-card', data, children);
  },
};
