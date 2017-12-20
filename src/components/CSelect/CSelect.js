import _ from 'lodash';
import fieldable from '../../mixins/fieldable';
import validator from '../../validators/basicValidator';

const getAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
    title: context.definition.tooltip,
  };

  return attrs;
};

const getDeletableChipSlot = (createElement, displayProp) => {
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
      data.item[displayProp],
    ),
  };

  return slot;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    input(value) {
      const parsedValue = _.isArray(value) ? value : [value];

      self.value = parsedValue;
      self.$emit('input', parsedValue);
    },
  };

  return listeners;
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
  if (definition.multiple && !_.isArray(definition.value)) {
    return [definition.value];
  }

  if (!definition.multiple && _.isArray(definition.value)) {
    return definition.value[0];
  }

  return definition.value;
};

const getProps = (context) => {
  const definition = context.definition;

  const props = {
    appendIcon: getPropAppendIcon(definition),
    autocomplete: true,
    chips: definition.chips,
    clearable: definition.clearable && !definition.readonly,
    deletableChips: definition.chips && definition.multiple && !definition.readonly,
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
    rules: validator.getRules(definition, context.validators),
    value: getPropValue(definition),
    validateOn: getPropValidateOnBlur(definition),
  };

  return props;
};

export default {
  name: 'c-select',
  mixins: [
    fieldable,
  ],
  render(createElement) {
    const context = this;
    const selectProps = getProps(context);

    return createElement(
      'v-select',
      {
        attrs: getAttrs(context),
        props: selectProps,
        scopedSlots: selectProps.deletableChips &&
          getDeletableChipSlot(createElement, selectProps.itemText),
        on: getListeners(context),
      },
    );
  },
};
