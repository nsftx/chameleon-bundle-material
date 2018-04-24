import { fieldable } from '@mixins';
import { validator } from '@validators';
import Element from '../Element';


const getAttrs = (context) => {
  const config = context.config;

  const attrs = {
    name: config.name,
  };

  return attrs;
};

const getPropValidateOnBlur = (config) => {
  if (config.validation && config.validateOn) {
    return config.validateOn === 'blur';
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

const getPropRequired = (config) => {
  if (config.validation) {
    return !!config.validation.required;
  }

  return false;
};

const getProps = (context) => {
  const config = context.config;

  const props = {
    appendIcon: config.appendIcon,
    hint: config.hint,
    label: config.label,
    persistentHint: config.persistentHint,
    placeholder: config.placeholder,
    prependIcon: config.prependIcon,
    disabled: config.disabled,
    color: config.color,
    inputValue: context.value,
    value: config.value,
    validateOn: getPropValidateOnBlur(config),
    required: getPropRequired(config),
    rules: validator.getRules(config, context.registry.validators),
  };

  return props;
};

export default {
  extends: Element,
  mixins: [
    fieldable,
  ],
  render() {
    const data = {
      attrs: getAttrs(this),
      props: getProps(this),
      on: getListeners(this),
    };

    return this.renderElement('v-checkbox', data);
  },
};
