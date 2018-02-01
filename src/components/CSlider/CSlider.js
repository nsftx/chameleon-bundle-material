import namespace from '@namespace';
import { fieldable } from '@mixins';
import { validator } from '@validators';

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
    input(value) {
      self.definition.value = value;
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

const getPropTick = (definition) => {
  if (definition.step) {
    const range = definition.validation.max - definition.validation.min;
    return (range / definition.step) >= definition.step;
  }
  return false;
};

const getPropValidateOnBlur = (definition) => {
  if (definition.validation && definition.validateOn) {
    return definition.validateOn === 'blur';
  }

  return false;
};

const getProps = (context) => {
  const definition = context.definition;

  const props = {
    label: definition.label,
    hint: definition.hint,
    persistentHint: definition.persistentHint,
    appendIcon: definition.appendIcon,
    prependIcon: definition.prependIcon,
    color: definition.color,
    trackColor: definition.trackColor,
    thumbColor: definition.thumbColor,
    thumbLabel: definition.thumbLabel,
    min: definition.validation.min,
    max: definition.validation.max,
    step: definition.step,
    ticks: getPropTick(definition),
    validateOn: getPropValidateOnBlur(definition),
    required: getPropRequired(definition),
    rules: validator.getRules(definition, context.validators),
  };

  return props;
};

export default {
  name: `${namespace}slider`,
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
      'v-slider',
      {
        attrs: getAttrs(this),
        props: getProps(this),
        on: getListeners(this),
      },
    );
  },
};
