// import _assign from 'lodash/assign';
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
  const width = '580px';

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
    clearable: _isNil(definition.clearable) ? true : definition.clearable,
    appendIcon: definition.appendIcon,
    prependIcon: _isNil(definition.prependIcon) ? 'event' : definition.prependIcon,
    label: definition.label,
    hint: definition.hint,
    persistentHint: true,
    placeholder: definition.placeholder,
    required: getPropRequired(definition),
    rules: validator.getRules(definition, context.validators),
    value: context.value,
  };

  return props;
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
    };
  },
  watch: {
    valueFrom() {
      if (_isNil(this.valueTo)) this.valueTo = this.valueFrom;
      this.setValue();
    },
    valueTo() {
      if (_isNil(this.valueFrom)) this.valueFrom = this.valueTo;
      this.setValue();
    },
  },
  methods: {
    setValue() {
      if (this.valueFrom && this.valueTo) {
        this.value = `${this.valueFrom} - ${this.valueTo}`;
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
            definition: this.definition,
            startRange: true,
          },
          on: {
            input(value) {
              self.valueFrom = value;
            },
          },
        },
      ),
      createElement(
        'c-picker',
        {
          staticClass: 'right',
          props: {
            definition: this.definition,
            endRange: true,
          },
          on: {
            input(value) {
              self.valueTo = value;
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
