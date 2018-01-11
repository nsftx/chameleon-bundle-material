import _ from 'lodash';
import fieldable from '../../mixins/fieldable';
import validator from '../../validators/basicValidator';

const getListeners = (context) => {
  const self = context;

  const listeners = {
    change(value) {
      self.definition.inputValue = value;
      self.definition.value = value;
      self.$emit('change', value);
    },
  };

  return listeners;
};

const getPropRequired = (definition) => {
  if (definition.validation) {
    return !!definition.validation.required;
  }

  return false;
};

const getPropValidateOnBlur = (definition) => {
  if (definition.validation && definition.validateOn) {
    return definition.validateOn === 'blur';
  }

  return false;
};

const getProps = (context, item) => {
  const definition = context.definition;

  const props = {
    label: item.label,
    hideDetails: definition.hideDetails,
    prependIcon: definition.prependIcon,
    appendIcon: definition.appendIcon,
    persistentHint: definition.persistentHint,
    inputValue: definition.value,
    hint: definition.hint,
    minCount: definition.validation.minCount,
    maxCount: definition.validation.maxCount,
    disabled: item.disabled,
    color: item.color,
    value: item.value,
    validateOn: getPropValidateOnBlur(definition),
    required: getPropRequired(definition),
    rules: validator.getRules(definition, context.validators),
  };

  return props;
};

export default {
  name: 'c-check-list',
  props: {
    definition: {
      type: Object,
      required: true,
    },
  },
  mixins: [
    fieldable,
  ],
  render(createElement) {
    return createElement(
      'v-card',
      {
        props: {
          color: 'transparent',
          flat: true,
        },
      },
      _.map(this.definition.dataSource.items,
        item => createElement('v-checkbox',
          {
            attrs: {
              name: this.definition.name,
            },
            props: getProps(this, item),
            on: getListeners(this, item),
          },
        )),
    );
  },
};
