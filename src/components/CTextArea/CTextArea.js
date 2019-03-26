import { fieldable, validatable } from '@/mixins';
import { validator } from '@/validators';
import { isNil, isObject } from 'lodash';
import Element from '../Element';

const getPropRequired = (config) => {
  if (config.validation) {
    return !!config.validation.required;
  }

  return false;
};

const getProps = (context) => {
  const { config } = context;

  const props = {
    label: config.label,
    autoGrow: config.autoGrow,
    outline: config.outline,
    rows: config.rows,
    color: config.color,
    dark: context.isThemeDark,
    light: context.isThemeLight,
    prependIcon: config.prependIcon,
    appendIcon: config.appendIcon,
    tooltip: config.tooltip,
    clearable: config.clearable,
    disabled: config.disabled,
    required: getPropRequired(config),
    rules: validator.getRules(config, context.validators),
    value: context.textValue,
  };

  return props;
};

export default {
  extends: Element,
  mixins: [
    fieldable,
    validatable,
  ],
  watch: {
    dataSource: {
      handler() {
        this.loadData();
      },
      deep: true,
    },
  },
  computed: {
    textValue() {
      if (this.items && this.items.length) {
        return isObject(this.items[0]) ? this.items[0].text : this.items[0];
      }
      return this.config.value;
    },
  },
  mounted() {
    this.value = this.textValue;
  },
  render(createElement) {
    const self = this;
    const data = {
      attrs: {
        name: self.config.name,
        title: self.config.tooltip,
      },
      props: getProps(self),
      on: {
        focus() {
          self.sendToEventBus('FocusedIn', { text: self.value });
        },
        input(value) {
          self.value = value;
          if (isNil(value)) {
            self.sendToEventBus('Cleared', { text: value });
          }
          self.sendToEventBus('Changed', { text: value });
          self.$emit('input', self.value);
        },
        blur() {
          self.sendToEventBus('FocusedOut', { text: self.value });
        },
      },
    };

    const children = [
      createElement(
        'v-textarea',
        data,
      ),
    ];

    return self.renderElement('div', {}, children);
  },
};
