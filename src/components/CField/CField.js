import fieldRenderer from '../../renderers/fieldRenderer';

export default {
  name: 'c-field',
  functional: false,
  props: {
    definition: {
      type: Object,
      required: true,
    },
    validators: {
      type: Object,
    },
  },
  data() {
    return {
      value: null,
    };
  },
  render(createElement) {
    const context = this;

    return fieldRenderer.render(
      createElement,
      context,
    );
  },
  mounted() {
    this.value = this.definition.value;
  },
};
