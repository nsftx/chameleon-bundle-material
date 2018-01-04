import validator from '../../validators/basicValidator';

const getPropRequired = (definition) => {
  if (definition.validation) {
    return !!definition.validation.required;
  }

  return false;
};

const getAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
    inputValue: context.definition.inputValue,
  };

  return attrs;
};

const getProps = (context) => {
  const definition = context.definition;

  const props = {
    appendIcon: definition.appendIcon,
    hint: definition.hint,
    label: definition.label,
    persistentHint: definition.persistentHint,
    placeholder: definition.placeholder,
    prependIcon: definition.prependIcon,
    disabled: definition.disabled,
    color: definition.color,
    required: getPropRequired(definition),
    rules: validator.getRules(definition, context.validators),
  };

  return props;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    change() {
      self.definition.inputValue = !self.definition.inputValue;
    },
  };

  return listeners;
};


export default {
  name: 'c-checkbox',
  props: {
    definition: {
      type: Object,
      required: true,
    },
  },
  render(createElement) {
    return createElement(
      'v-checkbox',
      {
        attrs: getAttrs(this),
        props: getProps(this),
        on: getListeners(this),
      },
    );
  },
};
