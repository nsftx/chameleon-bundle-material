import namespace from '@namespace';
import { elementable, fieldable } from '@mixins';

const getListeners = (context) => {
  const self = context;

  const listeners = {
    change() {
      self.definition.inputValue = !self.definition.inputValue;
      self.definition.value = self.definition.inputValue;
    },
  };

  return listeners;
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
    value: context.definition.value,
    inputValue: context.definition.value,
  };

  return props;
};

export default {
  name: `${namespace}switch`,
  mixins: [
    elementable,
    fieldable,
  ],
  render(createElement) {
    const children = [
      createElement(
        'v-switch',
        {
          attrs: {
            name: this.definition.name,
          },
          props: getProps(this),
          on: getListeners(this),
        },
      ),
    ];

    return createElement('div', {
      attrs: this.getSchemaAttributes(),
      staticClass: `${this.baseClass} ${this.$options.name}`,
    }, children);
  },
};
