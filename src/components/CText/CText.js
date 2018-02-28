import { isBoolean, isUndefined, merge } from 'lodash';
import namespace from '@namespace';
import { elementable, fieldable } from '@mixins';
import { validator } from '@validators';

const getAttrs = (context) => {
  const definition = context.definition;

  const attrs = {
    name: definition.name,
    // If required tooltip should be added as child component VTooltip
    title: definition.tooltip,
  };

  if (!isUndefined(definition.step)) {
    if (isBoolean(definition.step)) {
      if (definition.step) {
        attrs.step = 1;
      }
    } else {
      attrs.step = definition.step;
    }
  }

  return attrs;
};

const getMask = (definition) => {
  const mask = definition.mask;
  if (mask) {
    // Mask value has priority over predefined mask
    if (mask.value) {
      return mask.value;
    } else if (mask.predefined) {
      // Map Chameleon masks to Vuetify masks
      switch (mask.predefined) {
        case 'creditCard':
          return 'credit-card';
        case 'shortTime':
          return 'time';
        case 'longTime':
          return 'time-with-seconds';
        default:
          return null;
      }
    }
  }

  return null;
};

const getPropRequired = (definition) => {
  // Required validation is property in Vuetify
  // This property sets * next to label
  if (definition.validation) {
    return !!definition.validation.required;
  }

  return false;
};

const getPropMultiline = (definition) => {
  if (['calculation', 'number', 'money'].indexOf(definition.type) > -1) {
    return false;
  }

  return definition.multiLine;
};

const getPropSuffix = (definition) => {
  if (['money'].indexOf(definition.type) > -1 && definition.currency) {
    return definition.currency[definition.suffix];
  }

  return definition.suffix;
};

const getPropPrefix = (definition) => {
  if (['money'].indexOf(definition.type) > -1 && definition.currency) {
    return definition.currency[definition.prefix];
  }

  return definition.prefix;
};

const getPropType = (definition) => {
  if (['number'].indexOf(definition.type) > -1 && definition.step) {
    return definition.type;
  }

  return 'text';
};

const getPropValidateOnBlur = (definition) => {
  if (definition.validation && definition.validateOn) {
    return definition.validateOn === 'blur';
  }

  return false;
};

const getProps = (context) => {
  const definition = context.definition;
  const mask = getMask(definition);

  // Hard-coded values are candidates for definition
  const props = {
    appendIcon: definition.appendIcon,
    clearable: definition.clearable,
    counter: false,
    hint: definition.hint,
    label: definition.label,
    loading: false,
    multiLine: getPropMultiline(definition),
    persistentHint: definition.persistentHint,
    placeholder: definition.placeholder,
    prefix: getPropPrefix(definition),
    prependIcon: definition.prependIcon,
    required: getPropRequired(definition),
    rules: validator.getRules(definition, context.$chameleon.validators),
    suffix: getPropSuffix(definition),
    type: getPropType(definition),
    value: definition.value,
    validateOn: getPropValidateOnBlur(definition),
  };

  if (mask) props.mask = mask;

  return props;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    input(value) {
      self.value = value;
      self.$emit('input', value);
    },
    blur() {
      self.$emit('blur', self.value);
    },
  };

  return listeners;
};

export default {
  name: `${namespace}text`,
  mixins: [
    elementable,
    fieldable,
  ],
  render(createElement) {
    return createElement(
      'v-text-field',
      {
        attrs: merge(getAttrs(this), this.getSchemaAttributes()),
        props: getProps(this),
        on: getListeners(this),
        staticClass: `${this.baseClass} ${this.$options.name}`,
      },
    );
  },
};
