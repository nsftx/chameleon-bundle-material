import { isNil } from 'lodash';
import { fieldable, validatable } from '@mixins';
import { validator } from '@validators';
import Element from '../Element';

const getAttrs = (context) => {
  const config = context.config;

  const attrs = {
    name: config.name,
    title: config.description ? config.description.tooltip : null,
  };
  return attrs;
};

const getPropAppendIcon = (config) => {
  switch (config.type) {
    case 'money':
      return 'attach_money';
    case 'password':
      return 'visibility';
    default:
      return null;
  }
};

const getPropPrependIcon = (config) => {
  switch (config.type) {
    case 'email':
      return 'email';
    case 'phone':
      return 'phone';
    case 'url':
      return 'link';
    case 'number':
      return 'unfold_more';
    case 'password':
      return 'lock';
    default:
      return null;
  }
};

// If type password, persistent hint is enabled by default
const getPropPersistentHint = config => config.type === 'password';

const getPropRequired = (config) => {
  // Required validation is property in Vuetify
  // This property sets * next to label
  if (config.validation) {
    return !!config.validation.required;
  }

  return false;
};

const getPropMask = (config) => {
  switch (config.type) {
    case 'text':
      return config.mask;
    case 'phone':
      return config.mask;
    default:
      return null;
  }
};

const getPropPrefix = config => (config.style ? config.style.prefix : null);
const getPropSuffix = config => (config.style ? config.style.suffix : null);
const getPropType = config => config.type || 'text';

const setConfigValues = (context) => {
  const config = context;
  if (config.style) {
    if (isNil(config.style.appendIcon)) {
      config.style.appendIcon = getPropAppendIcon(config);
    }
    if (isNil(config.style.prependIcon)) {
      config.style.prependIcon = getPropPrependIcon(config);
    }
  }
};

const setPropEmailPattern = (context) => {
  const config = context;
  if (config.type === 'email') {
    config.validation.pattern = config.validation.pattern || /\S+@\S+\.\S+/;
  }
};

const setPropPasswordPattern = (context) => {
  const config = context;
  if (config.type === 'password') {
    config.validation.pattern = config.validation.pattern || /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  }
};

const getProps = (context) => {
  const config = context.config;

  setConfigValues(config);
  setPropEmailPattern(config);
  setPropPasswordPattern(config);

  const props = {
    appendIcon: config.style ? config.style.appendIcon : null,
    clearable: config.clearable,
    color: config.style ? config.style.color : null,
    counter: false,
    dark: context.isThemeDark,
    disabled: config.disabled,
    hint: config.description ? config.description.hint : null,
    label: config.label,
    light: context.isThemeLight,
    loading: false,
    persistentHint: getPropPersistentHint(config),
    placeholder: config.description ? config.description.placeholder : null,
    prefix: getPropPrefix(config),
    prependIcon: config.style ? config.style.prependIcon : null,
    readonly: config.readonly,
    required: getPropRequired(config),
    rules: validator.getRules(config, context.validators),
    suffix: getPropSuffix(config),
    type: getPropType(config),
    mask: getPropMask(config),
    value: config.data ? config.data.value : null,
  };

  return props;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    focus() {
      self.sendToEventBus('FocusedIn', { value: self.value });
    },
    input(value) {
      self.value = value;
      if (isNil(value)) {
        self.sendToEventBus('Cleared', { value });
      }
      self.sendToEventBus('Changed', { value });
      self.$emit('input', self.value);
    },
    blur() {
      if (self.isResolvable) self.resolveValue();

      self.sendToEventBus('FocusedOut', { value: self.value });
    },
  };

  return listeners;
};

export default {
  extends: Element,
  mixins: [
    fieldable,
    validatable,
  ],
  render(createElement) {
    const data = {
      attrs: getAttrs(this),
      props: getProps(this),
      on: getListeners(this),
    };

    const children = [
      createElement(
        'v-text-field',
        data,
      ),
    ];

    return this.renderElement('div', {}, children);
  },
};
