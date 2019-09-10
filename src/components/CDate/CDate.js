import { clone, isNil, merge } from 'lodash';
import { fieldable, validatable } from '@/mixins';
import { validator } from '@/validators';
import Element from '../Element';

const getPropRequired = (config) => {
  // Required validation is property in Vuetify
  // This property sets * next to label
  if (config.validation) {
    return !!config.validation.required;
  }

  return false;
};

const getMenuProps = (context) => {
  const { config } = context;

  const props = {
    lazy: false,
    transition: isNil(config.transition) ? 'scale-transition' : config.transition,
    fullWidth: true,
    closeOnContentClick: false,
    minWidth: 'auto',
  };

  return props;
};

const getTextAttrs = (context) => {
  const { config } = context;

  const attrs = {
    name: config.name,
    title: config.tooltip,
  };

  return attrs;
};

const getTextProps = (context) => {
  const { config } = context;

  const props = {
    readonly: true,
    clearable: isNil(config.clearable) ? true : config.clearable,
    appendIcon: config.appendIcon,
    prependIcon: isNil(config.prependIcon) ? 'event' : config.prependIcon,
    label: config.label,
    hint: config.hint,
    persistentHint: true,
    placeholder: config.placeholder,
    required: getPropRequired(config),
    rules: validator.getRules(config, context.validators),
    value: context.formattedValue,
  };

  return props;
};

const getAllowedDates = (context) => {
  if (isNil(context.validation)) return null;
  const max = context.validation.maxDate;
  const min = context.validation.minDate;

  const validateDates = () => {
    if (max < min) {
      return {
        min: max,
        max: min,
      };
    }
    return {
      min: moment(min).isValid() ? min : null,
      max: moment(max).isValid() ? max : null,
    };
  };

  return validateDates();
};

const getPickerProps = (context) => {
  const config = clone(context.config);
  config.allowedDates = getAllowedDates(config);

  if (context.value) {
    config.value = context.value;
  }

  return config;
};

const getPicker = (context, createElement) => {
  const self = context;

  return createElement(
    self.getElementTag('picker'),
    {
      props: {
        definition: getPickerProps(context),
      },
      on: {
        input(value) {
          self.value = value;
          self.$emit('input', value);
          self.sendToEventBus('Changed', { value });
        },
        formattedInput(value) {
          self.formattedValue = value;
        },
      },
    },
  );
};

const getTextField = (context, createElement) => {
  const slot = {
    activator: (props) => {
      const { on } = props;
      merge(on, {
        input(value) {
          context.sendToEventBus('Changed', { value });
        },
      });
      return createElement(
        'v-text-field',
        {
          attrs: getTextAttrs(context),
          props: getTextProps(context),
          on,
        },
      );
    },
  };
  return slot;
};

export default {
  extends: Element,
  mixins: [
    fieldable,
    validatable,
  ],
  data() {
    return {
      formattedValue: null,
    };
  },
  render(createElement) {
    const self = this;

    const data = {
      props: getMenuProps(this),
      on: {
        input(value) {
          self.sendToEventBus('VisibilityChanged', { visible: value });
        },
      },
      scopedSlots: getTextField(self, createElement),
    };

    const children = [
      getPicker(self, createElement),
    ];

    return this.renderElement('v-menu', data, children);
  },
};
