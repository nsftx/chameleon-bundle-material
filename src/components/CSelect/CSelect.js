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

const getPropValidateOnBlur = (config) => {
  if (config.validation && config.validateOn) {
    return config.validateOn === 'blur';
  }

  return false;
};

const setItemProps = (context) => {
  const self = context;
  const data = self.config.dataSource;
  if (!isNil(data) && !isNil(data.items) && data.items.length > 0) {
    const mapProps = filter(data.items, i => !isNil(i.mapName));
    const itemProps = Object.keys(data.items[0]);
    self.config.itemValue = !mapProps.length ? itemProps[0] : 'value';
    self.config.itemText = !mapProps.length ? itemProps[1] : 'text';
  }
};

const getProps = (context) => {
  const config = context.config;
  setItemProps(context);

  const props = {
    appendIcon: getPropAppendIcon(config),
    clearable: config.clearable && !config.readonly,
    deletableChips: context.chips && !config.readonly,
    hint: config.hint,
    items: config.dataSource ? config.dataSource.items : [],
    label: config.label,
    loading: false,
    itemValue: config.itemValue,
    itemText: config.itemText,
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
        this.config.dataSource.items = isNil(result) ? [] : result.items;
      });
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
    if (isNil(this.config.dataSource)) {
      this.config.dataSource = {
        items: [],
      };
    }
    this.selectAttr = getAttrs(this);
    this.selectListeners = getListeners(this);
    this.loadData();
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
