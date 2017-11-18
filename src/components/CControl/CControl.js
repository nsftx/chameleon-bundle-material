import controlRenderer from '../../renderers/controlRenderer';

export default {
  name: 'c-control',
  functional: true,
  props: {
    definition: {
      type: Object,
      required: true,
    },
    validators: {
      type: Object,
    },
  },
  render(createElement, context) {
    const definition = context.props.definition;
    const validators = context.props.validators;

    return controlRenderer.render(
      definition,
      validators,
      createElement,
      context,
    );
  },
};
