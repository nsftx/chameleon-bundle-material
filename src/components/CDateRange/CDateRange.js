import { clone, isNil } from 'lodash';
import { fieldable } from '@mixins';
import { validator } from '@validators';
import Element from '../Element';

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

  const props = {
    lazy: false,
    transition: isNil(definition.transition) ? 'scale-transition' : definition.transition,
    fullWidth: true,
    closeOnContentClick: false,
    maxWidth: '520px',
  };

  return props;
};

const getTextAttrs = (context) => {
  const definition = context.definition;

  const attrs = {
    name: definition.name,
    title: definition.tooltip,
  };

  return attrs;
};

const getTextProps = (context) => {
  const definition = context.definition;

  const props = {
    readonly: true,
    clearable: isNil(definition.clearable) ? true : definition.clearable,
    appendIcon: definition.appendIcon,
    prependIcon: isNil(definition.prependIcon) ? 'event' : definition.prependIcon,
    label: definition.label,
    hint: definition.hint,
    persistentHint: true,
    placeholder: definition.placeholder,
    required: getPropRequired(definition),
    rules: validator.getRules(definition, context.registry.validators),
    value: context.formattedValue,
  };

  return props;
};

const getAllowedDates = (context, endRange) => {
  if (isNil(context.definition.validation)) return null;
  const max = context.definition.validation.maxDate;
  let min = context.definition.validation.minDate;

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

const getPickerDefinition = (context, endRange) => {
  const definition = clone(context.definition);
  definition.allowedDates = getAllowedDates(context, endRange);

  if (context.value) {
    definition.value = endRange ? context.value[1] : context.value[0];
  } else if (definition.value) {
    definition.value = endRange ? definition.value[1] : definition.value[0];
  }

  return definition;
};

export default {
  extends: Element,
  mixins: [
    fieldable,
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
      return `${this.formattedValueFrom} - ${this.formattedValueTo}`;
    },
  },
  methods: {
    setValue() {
      if (this.valueFrom && this.valueTo) {
        this.value = [this.valueFrom, this.valueTo];
        this.$emit('input', this.value);
      }
    },
  },
  render(createElement) {
    const self = this;

    const data = {
      props: getMenuProps(this),
    };

    const children = [
      createElement(
        'v-text-field',
        {
          slot: 'activator',
          attrs: getTextAttrs(this),
          props: getTextProps(this),
        },
      ),
      createElement(
        this.getElementTag('picker'),
        {
          staticClass: 'left',
          props: {
            definition: getPickerDefinition(this),
            startRange: true,
          },
          on: {
            input(value) {
              self.valueFrom = value;
              if (moment(self.valueFrom).isAfter(self.valueTo)) {
                self.valueTo = self.valueFrom;
              }
            },
            formattedInput(value) {
              self.formattedValueFrom = value;
            },
          },
        },
      ),
      createElement(
        this.getElementTag('picker'),
        {
          staticClass: 'left',
          props: {
            definition: getPickerDefinition(this, true),
            endRange: true,
          },
          on: {
            input(value) {
              self.valueTo = value;
            },
            formattedInput(value) {
              self.formattedValueTo = value;
            },
          },
        },
      ),
    ];

    return this.renderElement('v-menu', data, children);
  },
};
