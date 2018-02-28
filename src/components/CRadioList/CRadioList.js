import { map } from 'lodash';
import namespace from '@namespace';
import { elementable, fieldable } from '@mixins';
import { validator } from '@validators';

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
    rules: validator.getRules(definition, context.$chameleon.validators),
  };

  return props;
};

export default {
  name: `${namespace}radio-list`,
  mixins: [
    elementable,
    fieldable,
  ],
  render(createElement) {
    const children = [
      createElement(
        'v-radio-group',
        {
          attrs: {
            name: this.definition.name,
          },
          props: getProps(this),
          on: getListeners(this),
        },
        map(this.definition.dataSource.items,
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
      ),
    ];

    return createElement('div', {
      attrs: this.getSchemaAttributes(),
      staticClass: `${this.baseClass} ${this.$options.name}`,
    }, children);
  },
};
