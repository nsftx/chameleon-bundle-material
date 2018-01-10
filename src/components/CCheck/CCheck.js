import fieldable from '../../mixins/fieldable';
import validator from '../../validators/basicValidator';

const getAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
    inputValue: context.definition.inputValue,
    trueValue: context.definition.value,
  };

  return attrs;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    change() {
      self.definition.inputValue = self.definition.inputValue ? null : true;
      self.definition.trueValue = self.definition.value || self.definition.label;
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
        attrs: getAttrs(this),
        props: getProps(this),
        on: getListeners(this),
      },
    );
  },
};
