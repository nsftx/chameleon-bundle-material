import VTextField from 'vuetify/es5/components/VTextField';

const getAttrs = (definition) => {
  const attrs = {
    name: definition.name,
    // If required tooltip should be added as child component VTooltip
    title: definition.tooltip,
  };

  return attrs;
};

const getProps = (definition, context) => {
  // Hard-coded values are candidates for definition
  const props = {
    clearable: definition.clearable,
    counter: false,
    hint: definition.hint,
    label: definition.label,
    loading: false,
    multiLine: definition.multiLine,
    persistentHint: false,
    placeholder: definition.placeholder,
    prefix: definition.prefix,
    prependIcon: definition.prependIcon,
    suffix: definition.suffix,
    type: 'text',
    value: context.data.model.value,
  };

  return props;
};

export default {
  parse(definition, createElement, context) {
    return createElement(
      VTextField,
      {
        attrs: getAttrs(definition),
        props: getProps(definition, context),
        // Proxy up component events
        on: context.data.on,
      },
    );
  },
};
