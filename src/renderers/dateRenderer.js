import _isNil from 'lodash/isNil';

const getPropRequired = (definition) => {
  // Required validation is property in Vuetify
  // This property sets * next to label
  if (definition.validation) {
    return !!definition.validation.required;
  }

  return false;
};

const getMenuProps = (context, definition) => {
  const width = '290px';

  const props = {
    lazy: false,
    transition: _isNil(definition.transition) ? 'scale-transition' : definition.transition,
    fullWidth: true,
    maxWidth: width,
    minWidth: width,
  };

  return props;
};

const getTextAttrs = (context, definition) => {
  const attrs = {
    name: definition.name,
  };

  return attrs;
};

const getTextProps = (context, definition, validator) => {
  const props = {
    readonly: true,
    clearable: _isNil(definition.clearable) ? true : definition.clearable,
    prependIcon: _isNil(definition.prependIcon) ? 'event' : definition.prependIcon,
    label: definition.label,
    required: getPropRequired(definition),
    rules: validator.getRules(definition, context.validators),
    value: context.value,
  };

  return props;
};

const getTextListeners = (context) => {
  const self = context;

  const listeners = {
    input(value) {
      self.value = value;
    },
  };

  return listeners;
};

const getPickerProps = (context, definition) => {
  const props = {
    noTitle: true,
    scrollable: true,
    autosave: true,
    value: definition.value,
  };

  return props;
};

const getPickerListeners = (context) => {
  const self = context;

  const listeners = {
    input(value) {
      self.value = value;
    },
  };

  return listeners;
};

export default {
  render(createElement, context, definition, validator) {
    return createElement(
      'v-menu',
      {
        props: getMenuProps(context, definition),
      },
      [
        createElement(
          'v-text-field',
          {
            slot: 'activator',
            attrs: getTextAttrs(context, definition),
            props: getTextProps(context, definition, validator),
            on: getTextListeners(context),
          },
        ),
        createElement(
          'v-date-picker',
          {
            props: getPickerProps(context, definition),
            on: getPickerListeners(context),
          },
        ),
      ],
    );
  },
};
