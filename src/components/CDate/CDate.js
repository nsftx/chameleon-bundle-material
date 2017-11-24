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
    closeOnContentClick: false,
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

const getDatePickerProps = (context) => {
  const props = {
    noTitle: false,
    scrollable: true,
    autosave: true,
    value: context.value,
  };

  return props;
};

const getDatePickerActionSlot = (createElement) => {
  const slot = {
    default: () => createElement('v-card-actions', [
      createElement('v-spacer'),
      createElement('v-btn',
        {
          props: {
            flat: true,
            icon: true,
          },
        },
        [
          createElement('v-icon', 'timer'),
        ]),
    ]),
  };

  return slot;
};

const getDatePickerListeners = (context) => {
  const self = context;

  const listeners = {
    input(value) {
      self.value = value;
      self.$emit('input', value);
    },
  };

  return listeners;
};

const getTimePickerProps = (context, definition) => {
  const props = {
    noTitle: false,
    scrollable: true,
    autosave: true,
    value: definition.value,
  };

  return props;
};

const getTimePickerListeners = (context) => {
  const self = context;

  const listeners = {
    input(value) {
      self.value = value;
    },
  };

  return listeners;
};

export default {
  name: 'c-date',
  props: {
    definition: {
      type: Object,
      required: true,
    },
    validators: {
      type: Object,
    },
    validator: {
      type: Object,
    },
  },
  data() {
    return {
      value: null,
    };
  },
  render(createElement) {
    const context = this;
    const definition = this.definition;
    const validator = this.validator;

    const children = [
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
          scopedSlots: definition.time ? getDatePickerActionSlot(createElement, context) : null,
          props: getDatePickerProps(context, definition),
          on: getDatePickerListeners(context),
        },
      ),
    ];

    if (definition.time && definition.time.enabled) {
      children.push([
        createElement(
          'v-time-picker',
          {
            props: getTimePickerProps(context, definition),
            on: getTimePickerListeners(context),
          },
        ),
      ]);
    }

    return createElement(
      'v-menu',
      {
        props: getMenuProps(context, definition),
      },
      children,
    );
  },
  mounted() {
    this.value = this.definition.value;
  },
};
