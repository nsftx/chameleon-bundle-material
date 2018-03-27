import { isNil } from 'lodash';
import { elementable, fieldable } from '@mixins';
import { validator } from '@validators';

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
    transition: isNil(definition.transition) ? 'scale-transition' : definition.transition,
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
    clearable: isNil(definition.clearable) ? true : definition.clearable,
    appendIcon: definition.appendIcon,
    prependIcon: isNil(definition.prependIcon) ? 'event' : definition.prependIcon,
    label: definition.label,
    hint: definition.hint,
    persistentHint: true,
    placeholder: definition.placeholder,
    required: getPropRequired(definition),
    rules: validator.getRules(definition, context.$chameleon.validators),
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
  const definition = context.definition;
  definition.allowedDates = getAllowedDates(definition);
  if (context.value) definition.value = context.value;

  const props = {
    definition,
  };

  return props;
};

export default {
  mixins: [
    elementable,
    fieldable,
  ],
  data() {
    return {
      formattedValue: null,
    };
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
        `${this.$options.namespace}picker`,
        {
          props: getPickerProps(this),
          on: {
            input(value) {
              self.value = value;
            },
            formattedInput(value) {
              self.formattedValue = value;
            },
          },
        },
      ),
    ];

    return createElement(
      'v-menu',
      {
        attrs: this.getSchemaAttributes(),
        props: getMenuProps(this),
        staticClass: `${this.baseClass} ${this.$options.name}`,
      },
      children,
    );
  },
};
