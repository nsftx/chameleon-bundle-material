import { fieldable, elementable } from '@mixins';
import { validator } from '@validators';

const getAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
  };

  return attrs;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    input(value) {
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
    value: definition.value,
    inputValue: context.value,
    validateOn: getPropValidateOnBlur(definition),
    required: getPropRequired(definition),
    rules: validator.getRules(definition, context.$chameleon.validators),
  };

  return props;
};

export default {
  mixins: [
    fieldable,
    elementable,
  ],
  render(createElement) {
    const children = [
      createElement(
        'v-slider',
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
