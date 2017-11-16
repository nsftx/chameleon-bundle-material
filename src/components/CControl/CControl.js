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
    const self = context;
    const definition = self.props.definition;
    const parsedControl = controlParser.parse(definition);

    return createElement(parsedControl.base, parsedControl.options);
  },
};
