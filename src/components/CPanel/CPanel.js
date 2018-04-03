import { bindable, elementable } from '@mixins';

export default {
  mixins: [
    bindable,
    elementable,
  ],
  render(createElement) {
    const definition = this.definition;

    return createElement(
      'v-card',
      {
        key: this.schema.uid,
        attrs: this.getSchemaAttributes(),
        props: {
          color: this.getBindingValue(definition.color),
          flat: definition.flat,
        },
        style: {
          width: definition.width,
        },
        staticClass: `${this.baseClass} ${this.$options.name}`,
      },
      [
        createElement('div', {
          staticClass: `${this.baseChildrenClass} ${this.$options.name}-items`,
        }, this.renderChildren(createElement)),
      ],
    );
  },
};
