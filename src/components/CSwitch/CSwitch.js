import namespace from '@namespace';
import { elementable, fieldable } from '@mixins';

const getAttrs = (context) => {
  const definition = context.definition;

  const attrs = {
    name: definition.name,
  };

  return attrs;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    change(value) {
      self.value = value;
      self.$emit('change', value);
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
    inputValue: context.value,
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
          attrs: getAttrs(this),
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
