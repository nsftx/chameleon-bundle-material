const getAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
    value: context.definition.value,
  };

  return attrs;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    change() {
      self.definition.value = self.definition.value || self.definition.label;
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
  };

  return props;
};

export default {
  name: 'c-radio',
  provide() {
    return {
      name: () => this.definition.name,
      isMandatory: () => this.definition.isMandatory,
    };
  },
  props: {
    definition: {
      type: Object,
      required: true,
    },
  },
  render(createElement) {
    return createElement(
      'v-radio',
      {
        attrs: getAttrs(this),
        props: getProps(this),
        on: getListeners(this),
      },
    );
  },
};
