import { isNil, filter } from 'lodash';
import { fieldable, validatable } from '@mixins';
import { validator } from '@validators';
import Element from '../Element';

const getAttrs = (context) => {
  const attrs = {
    name: context.config.name,
    title: context.config.tooltip,
  };

  return attrs;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    input(value) {
      self.value = value;
      self.config.value = value;
      self.sendToEventBus('Selected', value);
      self.$emit('input', value);
    },
  };

  return listeners;
};

const getPropAppendIcon = config => config.appendIcon || 'arrow_drop_down';

const getPropRequired = (config) => {
  if (!isNil(config.validation)) {
    return !!config.validation.required;
  }

  return false;
};

const setItemProps = (context) => {
  const self = context;
  const data = self.config.dataSource;
  const mapProps = data && data.schema ? filter(data.schema, i => !isNil(i.mapName)) : [];
  const itemProps = Object.keys(context.items[0]);
  self.config.itemValue = !mapProps.length ? itemProps[0] : 'value';
  self.config.itemText = String(!mapProps.length ? itemProps[1] || itemProps[0] : 'text');
};

const getProps = (context) => {
  const config = context.config;
  if (!isNil(context.items) && context.items.length !== 0) {
    setItemProps(context);
  }

  const props = {
    appendIcon: getPropAppendIcon(config),
    clearable: config.clearable && !config.readonly,
    deletableChips: context.chips && !config.readonly,
    chips: context.chips,
    hint: config.hint,
    items: context.items || [],
    label: config.label,
    loading: false,
    itemValue: config.itemValue,
    itemText: config.itemText,
    color: config.color,
    dark: context.isThemeDark,
    light: context.isThemeLight,
    multiple: config.multiple,
    openOnClear: config.clearable,
    persistentHint: config.persistentHint,
    placeholder: config.placeholder,
    prependIcon: config.prependIcon,
    readonly: config.readonly,
    disabled: config.disabled,
    required: getPropRequired(config),
    returnObject: true,
    rules: validator.getRules(config, context.validators),
    value: config.value,
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
    },
  },
  data() {
    return {
      chips: false,
      selectAttr: {},
      selectListeners: {},
    };
  },
  created() {
    this.selectAttr = getAttrs(this);
    this.selectListeners = getListeners(this);
  },
  render(createElement) {
    const children = createElement(
      'v-select',
      {
        props: getProps(this),
        attrs: this.selectAttr,
        on: this.selectListeners,
      },
    );

    return this.renderElement('div', {}, children);
  },
};
