import namespace from '@namespace';

export default {
  name: `${namespace}placeholder`,
  props: {
    definition: {
      type: Object,
      required: true,
    },
  },
  render(createElement) {
    return createElement(
      'router-view',
      {
        staticClass: this.$options.name,
      },
    );
  },
};
