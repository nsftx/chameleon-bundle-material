import controlRenderer from '../../renderers/controlRenderer';

export default {
  name: 'c-control',
  functional: true,
  props: {
    definition: {
      type: Object,
      required: true,
    },
  },
  render(createElement, context) {
    const definition = context.props.definition;

    return controlRenderer.render(
      definition,
      createElement,
      context,
    );
  },
};
