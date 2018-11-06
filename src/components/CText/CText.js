import { isNil, isObject } from 'lodash';
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

const getPropRequired = (config) => {
  // Required validation is property in Vuetify
  // This property sets * next to label
  if (config.validation) {
    return !!config.validation.required;
  }

  return false;
};

const getPropPrefix = config => (config.style ? config.style.prefix : null);
const getPropSuffix = config => (config.style ? config.style.suffix : null);
const getProps = (context) => {
  const config = context.config;

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
    persistentHint: config.persistentHint || false,
    placeholder: config.description ? config.description.placeholder : null,
    prefix: getPropPrefix(config),
    prependIcon: config.style ? config.style.prependIcon : null,
    readonly: config.readonly,
    required: getPropRequired(config),
    rules: validator.getRules(config, context.validators),
    suffix: getPropSuffix(config),
    type: context.type,
    mask: config.mask || null,
    value: config.data ? config.data.value : null,
  };

  return props;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    'click:append': (e) => {
      self.onIconAppendClick(e);
      self.sendToEventBus('AppendIconClicked', e);
    },
    'click:prepend': (e) => {
      self.sendToEventBus('PrependIconClicked', e);
    },
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
  computed: {
    type() {
      const subtype = this.config.subtype;
      let type = 'text';

      if (subtype) {
        type = isObject(subtype) ? subtype.value : subtype;
      }

      if (type === 'password' && this.show) {
        return 'text';
      }

      return type;
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onIconAppendClick() {
      this.show = !this.show;
    },
  },
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
