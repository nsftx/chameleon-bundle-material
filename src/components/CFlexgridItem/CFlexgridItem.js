import namespace from '@namespace';

export default {
  name: `${namespace}flexgrid-item`,
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
    return createElement('v-flex',
      {
        attrs: {
          [`xs${this.definition.width}`]: true,
        },
      });
  },
};
