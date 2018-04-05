import { isArray, isNil, merge } from 'lodash';
import { elementable, fieldable } from '@mixins';
import { validator } from '@validators';

const getAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
    title: context.definition.tooltip,
  };

  return attrs;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    input(value) {
      const parsedValue = isArray(value) ? value : [value];

      self.value = parsedValue;
      self.$emit('input', parsedValue);
    },
  };

  return listeners;
};

const getPropAppendIcon = definition => definition.appendIcon || 'arrow_drop_down';

const getPropRequired = (definition) => {
  if (!isNil(definition.validation)) {
    return !!definition.validation.required;
  }

  return false;
};

const getPropValidateOnBlur = (definition) => {
  if (definition.validation && definition.validateOn) {
    return definition.validateOn === 'blur';
  }

  return false;
};

const getPropValue = (definition) => {
  if (definition.multiple && !isArray(definition.value)) {
    return [definition.value];
  }

  if (!definition.multiple && isArray(definition.value)) {
    return definition.value[0];
  }

  return definition.value;
};

const getProps = (context) => {
  const definition = context.definition;

  if (isNil(definition.dataSource)) {
    definition.dataSource = {
      items: [],
      options: {
        displayProp: 'name',
      },
    };
  }

  const props = {
    appendIcon: getPropAppendIcon(definition),
    autocomplete: true,
    chips: context.chips,
    clearable: definition.clearable && !definition.readonly,
    deletableChips: context.chips && definition.multiple && !definition.readonly,
    hint: definition.hint,
    items: definition.dataSource.items,
    itemText: definition.dataSource.options.displayProp,
    itemValue: 'id',
    label: definition.label,
    loading: false,
    multiLine: definition.multiLine,
    multiple: definition.multiple,
    openOnClear: definition.clearable,
    persistentHint: definition.persistentHint,
    placeholder: definition.placeholder,
    prependIcon: definition.prependIcon,
    readonly: definition.readonly,
    required: getPropRequired(definition),
    returnObject: true,
    rules: validator.getRules(definition, context.options.validators),
    value: getPropValue(definition),
    validateOn: getPropValidateOnBlur(definition),
  };

  return props;
};

export default {
  mixins: [
    elementable,
    fieldable,
  ],
  data() {
    return {
      attrs: null,
      chips: false,
      listeners: null,
      selectProps: null,
    };
  },
  created() {
    const context = this;
    this.attrs = merge(getAttrs(context), this.getSchemaAttributes());
    this.selectProps = getProps(context);
    this.listeners = getListeners(context);
  },
  render(createElement) {
    const children = [
      createElement(
        'v-select',
        {
          attrs: this.attrs,
          props: this.selectProps,
          on: this.listeners,
        },
      ),
    ];

    return createElement('div', {
      attrs: this.getSchemaAttributes(),
      staticClass: `${this.baseClass} ${this.$options.name}`,
    }, children);
  },
};
