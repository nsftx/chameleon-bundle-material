import { map } from 'lodash';
import namespace from '@namespace';
import { elementable, fieldable } from '@mixins';
import { validator } from '@validators';

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
    rules: validator.getRules(definition, context.$chameleon.validators),
  };

  return props;
};

export default {
  name: `${namespace}check-list`,
  mixins: [
    elementable,
    fieldable,
  ],
  render(createElement) {
    return createElement(
      'v-card',
      {
        attrs: this.getSchemaAttributes(),
        props: {
          color: 'transparent',
          flat: true,
        },
        staticClass: `${this.baseClass} ${this.$options.name}`,
      },
      map(this.definition.dataSource.items,
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
