const getMask = (definition) => {
  const mask = definition.mask;
  if (mask) {
    // Mask value has priority over predefined mask
    if (mask.value) {
      return mask.value;
    } else if (mask.predefined) {
      // Map Chameleon masks to Vuetify masks
      switch (mask.predefined) {
        case 'creditCard':
          return 'credit-card';
        case 'shortTime':
          return 'time';
        case 'longTime':
          return 'time-with-seconds';
        default:
          return null;
      }
    }
  }

  return null;
};

const getRequired = (definition) => {
  // Required validation is property in Vuetify
  // This property sets * next to label
  if (definition.validation) {
    return !!definition.validation.required;
  }

  return false;
};

const getAttrs = (definition) => {
  const attrs = {
    name: definition.name,
    // If required tooltip should be added as child component VTooltip
    title: definition.tooltip,
  };

  return attrs;
};

const getProps = (definition, context, validator, validators) => {
  const mask = getMask(definition);

  // Hard-coded values are candidates for definition
  const props = {
    clearable: definition.clearable,
    counter: false,
    hint: definition.hint,
    label: definition.label,
    loading: false,
    multiLine: definition.multiLine,
    persistentHint: definition.persistentHint,
    placeholder: definition.placeholder,
    prefix: definition.prefix,
    prependIcon: definition.prependIcon,
    required: getRequired(definition),
    rules: validator.getRules(definition, validators),
    suffix: definition.suffix,
    type: 'text',
    value: context.data.model.value,
  };

  if (mask) props.mask = mask;

  return props;
};

export default {
  render(definition, createElement, context, validator, validators) {
    return createElement(
      'v-text-field',
      {
        attrs: getAttrs(definition),
        props: getProps(definition, context, validator, validators),
        // Proxy events up to functional component
        on: context.data.on,
      },
    );
  },
};
