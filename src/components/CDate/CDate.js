import _isNil from 'lodash/isNil';
import fieldable from '../../mixins/fieldable';
import validator from '../../validators/basicValidator';

const getPropRequired = (definition) => {
  // Required validation is property in Vuetify
  // This property sets * next to label
  if (definition.validation) {
    return !!definition.validation.required;
  }

  return false;
};

const getMenuProps = (context) => {
  const definition = context.definition;
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

const getTextAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
  };

  return attrs;
};

const getTextProps = (context) => {
  const definition = context.definition;

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

const getTimePickerProps = (context) => {
  const props = {
    noTitle: false,
    scrollable: true,
    autosave: true,
    value: context.definition.value,
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
  mixins: [
    fieldable,
  ],
  render(createElement) {
    const context = this;
    const hasTimeComponent = context.definition.time && context.definition.time.enabled;

    const children = [
      createElement(
        'v-text-field',
        {
          slot: 'activator',
          attrs: getTextAttrs(context),
          props: getTextProps(context),
          on: getTextListeners(context),
        },
      ),
      createElement(
        'v-date-picker',
        {
          scopedSlots: hasTimeComponent ? getDatePickerActionSlot(createElement, context) : null,
          props: getDatePickerProps(context),
          on: getDatePickerListeners(context),
        },
      ),
    ];

    if (hasTimeComponent) {
      children.push([
        createElement(
          'v-time-picker',
          {
            props: getTimePickerProps(context),
            on: getTimePickerListeners(context),
          },
        ),
      ]);
    }

    return createElement(
      'v-menu',
      {
        props: getMenuProps(context),
      },
      children,
    );
  },
};
