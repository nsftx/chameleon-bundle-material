import { clone, isNil } from 'lodash';
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

const getAllowedDates = (context, endRange) => {
  if (isNil(context.config.validation)) return null;
  const max = context.config.validation.maxDate;
  let min = context.config.validation.minDate;

  const validateDates = () => {
    if (max < min) {
      return {
        min: max,
        max: min,
      };
    }

    if (endRange && context.value) {
      min = moment(context.value[0]).subtract(1, 'days').format();
    }

    return {
      min: moment(min).isValid() ? min : null,
      max: moment(max).isValid() ? max : null,
    };
  };

  return validateDates();
};

const getTextField = (context, createElement) => {
  const self = context;
  return createElement(
    'v-text-field',
    {
      slot: 'activator',
      attrs: getTextAttrs(context),
      props: getTextProps(context),
      on: {
        input(value) {
          self.valueFrom = value;
          self.valueTo = value;
          context.sendToEventBus('Changed', { value });
        },
      },
    },
  );
};

const getPickerDefinition = (context, endRange) => {
  const config = clone(context.config);
  config.allowedDates = getAllowedDates(context, endRange);

  if (context.value) {
    config.value = endRange ? context.value[1] : context.value[0];
  } else if (config.value) {
    config.value = endRange ? config.value[1] : config.value[0];
  }

  return config;
};

const getPicker = (context, createElement) => {
  const self = context;
  return [
    getTextField(self, createElement),
    createElement(
      self.getElementTag('picker'),
      {
        props: {
          definition: getPickerDefinition(context),
          startRange: true,
        },
        staticClass: 'mr-1',
        on: {
          input(value) {
            self.valueFrom = value;
            if (moment(self.valueFrom).isAfter(self.valueTo)) {
              self.valueTo = self.valueFrom;
            }
            self.$emit('input', value);
            self.sendToEventBus('Changed', { value });
          },
          formattedInput(value) {
            self.formattedValueFrom = value;
          },
        },
      },
    ),
    createElement(
      context.getElementTag('picker'),
      {
        props: {
          definition: getPickerDefinition(context, true),
          endRange: true,
        },
        on: {
          input(value) {
            self.valueTo = value;
            self.$emit('input', value);
            self.sendToEventBus('Changed', { value });
          },
          formattedInput(value) {
            self.formattedValueTo = value;
          },
        },
      },
    ),
  ];
};

export default {
  extends: Element,
  mixins: [
    fieldable,
    validatable,
  ],
  data() {
    return {
      valueFrom: null,
      valueTo: null,
      formattedValueFrom: null,
      formattedValueTo: null,
    };
  },
  watch: {
    valueFrom() {
      if (isNil(this.valueTo)) this.valueTo = this.valueFrom;
      this.setValue();
    },
    valueTo() {
      if (isNil(this.valueFrom)) this.valueFrom = this.valueTo;
      this.setValue();
    },
  },
  computed: {
    formattedValue() {
      if (isNil(this.formattedValueFrom) && isNil(this.formattedValueTo)) {
        return null;
      }
      return `${this.formattedValueFrom} - ${this.formattedValueTo}`;
    },
  },
  methods: {
    setValue() {
      if (!isNil(this.valueFrom) && !isNil(this.valueTo)) {
        this.value = [this.valueFrom, this.valueTo];
      } else {
        this.value = null;
        this.$emit('input', this.value);
      }
    },
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
    };

    const children = getPicker(this, createElement);

    return this.renderElement('v-menu', data, children);
  },
};
