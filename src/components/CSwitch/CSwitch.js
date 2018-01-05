const getAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
    inputValue: context.definition.inputValue,
  };

  return attrs;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    change() {
      self.definition.inputValue = !self.definition.inputValue;
      self.definition.value = self.definition.inputValue;
    },
  };

  return listeners;
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
    value: context.definition.value,
  };

  return props;
};

export default {
  name: 'c-switch',
  props: {
    definition: {
      type: Object,
      required: true,
    },
  },
  render(createElement) {
    return createElement(
      'v-switch',
      {
        attrs: getAttrs(this),
        props: getProps(this),
        on: getListeners(this),
      },
    );
  },
};
