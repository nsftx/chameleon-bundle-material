import { elementable, fieldable } from '@mixins';
import { validator } from '@validators';

const getAttrs = (context) => {
  const definition = context.definition;

  const attrs = {
    name: definition.name,
  };

  return attrs;
};

const getPropValidateOnBlur = (definition) => {
  if (definition.validation && definition.validateOn) {
    return definition.validateOn === 'blur';
  }

  return false;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    change(value) {
      self.value = value;
      self.$emit('input', value);
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
    inputValue: context.value,
    value: definition.value,
    validateOn: getPropValidateOnBlur(definition),
    required: getPropRequired(definition),
    rules: validator.getRules(definition, context.registry.validators),
  };

  return props;
};

export default {
  mixins: [
    elementable,
    fieldable,
  ],
  render(createElement) {
    const children = [
      createElement(
        'v-checkbox',
        {
          attrs: getAttrs(this),
          props: getProps(this),
          on: getListeners(this),
        },
      ),
    ];

    return createElement('div', {
      attrs: this.getSchemaAttributes(),
      staticClass: `${this.baseClass} ${this.$options.name}`,
    }, children);
  },
};
