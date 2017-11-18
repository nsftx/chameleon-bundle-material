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
  render(createElement) {
    const context = this;

    return fieldRenderer.render(
      context.definition,
      context.validators,
      createElement,
      context,
    );
  },
};
