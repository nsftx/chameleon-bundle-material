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
  name: 'c-date',
  mixins: [
    fieldable,
  ],
  data() {
    return {
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
        'c-picker',
        {
          props: {
            definition: this.definition,
          },
          on: {
            input(value) {
              self.value = value;
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
