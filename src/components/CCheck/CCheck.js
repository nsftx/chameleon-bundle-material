import { merge } from 'lodash';
import namespace from '@namespace';
import { elementable, fieldable } from '@mixins';
import { validator } from '@validators';

const getListeners = (context) => {
  const self = context;

  const listeners = {
    change(value) {
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

const getProps = (context) => {
  const definition = context.definition;

  const props = {
    appendIcon: definition.appendIcon,
    hint: definition.hint,
    label: definition.label,
    persistentHint: definition.persistentHint,
    placeholder: definition.placeholder,
    prependIcon: definition.prependIcon,
    disabled: definition.disabled,
    color: definition.color,
    inputValue: definition.value,
    required: getPropRequired(definition),
    rules: validator.getRules(definition, context.$chameleon.validators),
  };

  return props;
};

export default {
  name: `${namespace}check`,
  mixins: [
    elementable,
    fieldable,
  ],
  render(createElement) {
    return createElement(
      'v-checkbox',
      {
        attrs: merge({
          name: this.definition.name,
        }, this.getSchemaAttributes()),
        props: getProps(this),
        on: getListeners(this),
        staticClass: `${this.baseClass} ${this.$options.name}`,
      },
    );
  },
};
