import controlParser from '../../utility/controlParser';

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

    return controlParser.parse(definition, createElement, context);
  },
};
