import namespace from '@namespace';

export default {
  name: `${namespace}html`,
  props: {
    definition: {
      type: Object,
      required: true,
    },
  },
  render(createElement) {
    return createElement(
      'div',
      {
        attrs: {
          class: this.definition.name,
        },
        domProps: {
          innerHTML: this.definition.value,
        },
      },
    );
  },
};
