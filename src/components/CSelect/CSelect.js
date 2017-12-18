import _isArray from 'lodash/isArray';
import fieldable from '../../mixins/fieldable';
import validator from '../../validators/basicValidator';

const getAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
    title: context.definition.tooltip,
  };

  return attrs;
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

const getProps = (context) => {
  const definition = context.definition;

  const props = {
    appendIcon: getPropAppendIcon(definition),
    autocomplete: definition.searchable,
    chips: definition.chips,
    clearable: definition.clearable,
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
  render(createElement) {
    const context = this;

    return createElement(
      'v-select',
      {
        attrs: getAttrs(context),
        props: getProps(context),
        on: getListeners(context),
      },
    );
  },
};
