import _ from 'lodash';
import fieldable from '../../mixins/fieldable';
import validator from '../../validators/basicValidator';

const getListeners = (context) => {
  const self = context;

  const listeners = {
    change(payload) {
      self.definition.inputValue = payload;
      self.definition.value = payload;
      self.$emit('change', payload);
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

const getProps = (context) => {
  const definition = context.definition;

  const props = {
    appendIcon: definition.appendIcon,
    hint: definition.hint,
    persistentHint: definition.persistentHint,
    prependIcon: definition.prependIcon,
    inputValue: context.definition.value,
    required: getPropRequired(definition),
    rules: validator.getRules(definition, context.validators),
  };

  return props;
};

export default {
  name: 'c-radio-list',
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
      'v-radio-group',
      {
        attrs: {
          name: this.definition.name,
        },
        props: getProps(this),
        on: getListeners(this),
      },
      _.map(this.definition.dataSource.items,
        item => createElement('v-radio',
          {
            props: {
              label: item.label,
              value: item.value,
              color: item.color,
              disabled: item.disabled,
            },
          },
        )),
    );
  },
};
