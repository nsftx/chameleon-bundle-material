import _ from 'lodash';
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
  const width = '580px';

  const props = {
    lazy: false,
    transition: _.isNil(definition.transition) ? 'scale-transition' : definition.transition,
    fullWidth: true,
    maxWidth: width,
    minWidth: width,
    closeOnContentClick: false,
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
    clearable: _.isNil(definition.clearable) ? true : definition.clearable,
    appendIcon: definition.appendIcon,
    prependIcon: _.isNil(definition.prependIcon) ? 'event' : definition.prependIcon,
    label: definition.label,
    hint: definition.hint,
    persistentHint: true,
    placeholder: definition.placeholder,
    required: getPropRequired(definition),
    rules: validator.getRules(definition, context.validators),
    value: context.formattedValue,
  };

  return props;
};

const getAllowedDates = (context, endRange) => {
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
  const definition = _.clone(context.definition);
  definition.allowedDates = getAllowedDates(context, endRange);
  if (context.value) {
    definition.value = endRange ? context.value[1] : context.value[0];
  } else {
    definition.value = endRange ? definition.value[1] : definition.value[0];
  }

  return definition;
};

export default {
  name: 'c-date-range',
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
      if (_.isNil(this.valueTo)) this.valueTo = this.valueFrom;
      this.setValue();
    },
    valueTo() {
      if (_.isNil(this.valueFrom)) this.valueFrom = this.valueTo;
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
        'c-picker',
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
        'c-picker',
        {
          staticClass: 'right',
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

    return createElement(
      'v-menu',
      {
        props: getMenuProps(this),
      },
      children,
    );
  },
};
