import { fieldable, validatable } from '@mixins';
import { validator } from '@validators';
import { isNil, isNaN } from 'lodash';
import Element from '../Element';

const getAttrs = (context) => {
  const attrs = {
    name: context.config.name,
  };

  return attrs;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    input(value) {
      const newValue = isNaN(value) ? context.config.validation.min || 0 : value;
      self.value = newValue;
      self.sendToEventBus('Changed', { newValue });
      self.$emit('input', newValue);
    },
  };

  return listeners;
};

const getPropRequired = (config) => {
  if (!isNil(config.validation)) {
    return !!config.validation.required;
  }

  return false;
};

const getPropTick = (config) => {
  if (config.step) {
    const range = config.validation.max - config.validation.min;
    return (range / config.step) >= config.step;
  }
  return false;
};

const getProps = (context) => {
  const config = context.config;
  config.value = context.value || 0;

  const props = {
    label: config.label,
    hint: config.hint,
    persistentHint: config.persistentHint,
    appendIcon: config.appendIcon,
    prependIcon: config.prependIcon,
    color: config.color,
    trackColor: config.trackColor,
    thumbColor: config.thumbColor,
    thumbLabel: config.thumbLabel,
    min: !isNil(config.validation) ? config.validation.min : null,
    max: !isNil(config.validation) ? config.validation.max : null,
    step: config.step,
    ticks: getPropTick(config),
    inputValue: context.value,
    value: context.value,
    disabled: config.disabled,
    required: getPropRequired(config),
    rules: validator.getRules(config, context.validators),
  };

  return props;
};

export default {
  extends: Element,
  mixins: [
    fieldable,
    validatable,
  ],
  render() {
    const data = {
      attrs: getAttrs(this),
      props: getProps(this),
      on: getListeners(this),
    };

    return this.renderElement('v-slider', data);
  },
};
