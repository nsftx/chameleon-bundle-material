import VTextField from 'vuetify/es5/components/VTextField';

const getBaseComponent = (definition) => {
  switch (definition.type) {
    case 'text':
      return VTextField;
    default:
      return VTextField;
  }
};

const getBaseComponentProps = (definition) => {
  const props = {
    label: definition.label,
    placeholder: definition.placeholder,
    prependIcon: definition.prependIcon,
  };

  return props;
};

const getBaseComponentAttrs = (definition) => {
  const attrs = {
    name: definition.name,
  };

  return attrs;
};

export default {
  name: 'c-control',
  functional: true,
  props: {
    definition: {
      type: Object,
      required: false,
    },
  },
  render(createElement, context) {
    const self = context;
    const definition = self.props.definition;
    const baseComponent = getBaseComponent(definition);

    return createElement(baseComponent, {
      props: getBaseComponentProps(definition),
      attrs: getBaseComponentAttrs(definition),
    });
  },
};
