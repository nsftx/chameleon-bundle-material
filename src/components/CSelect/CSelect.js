import _isArray from 'lodash/isArray';
import _isObject from 'lodash/isObject';
import _isUndefined from 'lodash/isUndefined';
import _merge from 'lodash/merge';
import fieldable from '../../mixins/fieldable';
import validator from '../../validators/basicValidator';

const getAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
    title: context.definition.tooltip,
  };

  return attrs;
};

const getDeletableChipSlot = (createElement) => {
  const slot = {
    selection: data => createElement('v-chip', {
      attrs: { tabindex: '-1' },
      key: JSON.stringify(data.item),
      staticClass: 'chip--select-multi',
      on: {
        input: () => data.parent.selectItem(data.item),
      },
      props: {
        close: true,
        selected: data.selected,
      },
    },
      data.item.name,
    ),
  };

  return slot;
};

const getPropAppendIcon = definition => definition.appendIcon || 'arrow_drop_down';

const getPropRequired = (definition) => {
  if (definition.validation) {
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
  if (definition.multiple && !_isArray(definition.value)) {
    return [definition.value];
  }

  if (!definition.multiple && _isArray(definition.value)) {
    return definition.value[0];
  }

  return definition.value;
};

const getItemsProps = (context) => {
  const options = context.definition.dataSourceOptions || {};

  return {
    itemText: options.itemText || 'name',
    itemValue: options.itemValue || 'id',
    returnObject: _isUndefined(options.returnItemObject) ? !context.isValueItemPrimitive :
      options.returnItemObject,
    tags: false,
  };
};

const getProps = (context) => {
  const definition = context.definition;

  const props = {
    appendIcon: getPropAppendIcon(definition),
    autocomplete: !!definition.searchable,
    chips: definition.chips,
    clearable: definition.clearable && !definition.readonly,
    deletableChips: definition.chips && !definition.readonly,
    hint: definition.hint,
    items: definition.dataSource,
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
    rules: validator.getRules(definition, context.validators),
    tags: definition.tags && definition.multiple,
    value: getPropValue(definition),
    validateOn: getPropValidateOnBlur(definition),
  };

  if (_isObject(definition.dataSource[0]) && !_isArray(definition.dataSource[0])) {
    const itemProps = getItemsProps(context);
    _merge(props, itemProps);
  }

  return props;
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

export default {
  name: 'c-select',
  mixins: [
    fieldable,
  ],
  computed: {
    isValueItemPrimitive() {
      const definition = this.definition;
      const val = _isArray(definition.value) ? definition.value[0] :
        this.definition.value;

      if (definition.dataSourceOptions && definition.dataSourceOptions.returnItemObject) {
        return definition.dataSourceOptions.returnItemObject;
      }

      return !_isObject(val);
    },
  },
  render(createElement) {
    const context = this;
    const selectProps = getProps(context);
    const hasCustomChips = selectProps.autocomplete && selectProps.deletableChips;

    return createElement(
      'v-select',
      {
        attrs: getAttrs(context),
        props: selectProps,
        scopedSlots: hasCustomChips && getDeletableChipSlot(createElement),
        on: getListeners(context),
      },
    );
  },
};
