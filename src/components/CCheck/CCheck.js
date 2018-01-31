import fieldable from '../../mixins/fieldable';
import validator from '../../validators/basicValidator';

const getListeners = (context) => {
  const self = context;

  const listeners = {
    change(value) {
      self.definition.value = value;
      self.$emit('change', value);
    },
  };

  return listeners;
};

const getPropRequired = (definition) => {
  if (definition.validation) {
    return !!definition.validation.required;
  }

  return false;
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
    inputValue: definition.value,
    required: getPropRequired(definition),
    rules: validator.getRules(definition, context.validators),
  };

  return props;
};

export default {
  name: 'c-check',
  props: {
    definition: {
      type: Object,
      required: true,
    },
  },
  mixins: [
    fieldable,
  ],
  render(createElement) {
    return createElement(
      'v-checkbox',
      {
        attrs: {
          name: this.definition.name,
        },
        props: getProps(this),
        on: getListeners(this),
      },
    );
  },
};
