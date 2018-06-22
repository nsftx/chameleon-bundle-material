import { isArray, isNil, filter } from 'lodash';
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
      const selection = isArray(value) ? value : [value];
      self.value = selection;
      self.sendToEventBus('Selected', selection);
      self.$emit('input', selection);
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

const getPropValidateOnBlur = (config) => {
  if (config.validation && config.validateOn) {
    return config.validateOn === 'blur';
  }

  return false;
};

const getItemProps = (context) => {
  const self = context;
  if (!isNil(self.config.dataSource.items) && self.config.dataSource.items.length > 0) {
    const mapProps = filter(self.config.dataSource.schema, i => !isNil(i.mapName));
    const itemProps = Object.keys(self.config.dataSource.items[0]);
    self.selectProps.itemValue = !mapProps.length ? itemProps[0] : 'value';
    self.selectProps.itemText = !mapProps.length ? itemProps[1] : 'text';
  }
};

const getProps = (context) => {
  const config = context.config;

  const props = {
    appendIcon: getPropAppendIcon(config),
    autocomplete: true,
    chips: context.chips,
    clearable: config.clearable && !config.readonly,
    deletableChips: context.chips && config.multiple && !config.readonly,
    hint: config.hint,
    items: config.dataSource.items || [],
    label: config.label,
    loading: false,
    itemValue: 'value',
    itemText: 'text',
    color: config.color,
    dark: context.isThemeDark,
    light: context.isThemeLight,
    multiLine: config.multiLine,
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
    validateOn: getPropValidateOnBlur(config),
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
  methods: {
    loadData() {
      this.loadConnectorData().then((result) => {
        if (isNil(this.config.dataSource)) this.config.dataSource = {};
        this.config.dataSource.items = result.items || [];
        this.selectProps.items = result.items || [];
        getItemProps(this);
      });
    },
  },
  data() {
    return {
      attrs: null,
      chips: false,
      listeners: null,
      selectProps: null,
    };
  },
  created() {
    if (isNil(this.config.dataSource)) {
      this.config.dataSource = {
        items: [],
      };
    }

    const context = this;
    this.attrs = getAttrs(context);
    this.selectProps = getProps(context);
    this.listeners = getListeners(context);
    this.loadData();
  },
  render(createElement) {
    const children = createElement(
      'v-select',
      {
        attrs: this.attrs,
        props: this.selectProps,
        on: this.listeners,
      },
    );

    return this.renderElement('div', {}, children);
  },
};
