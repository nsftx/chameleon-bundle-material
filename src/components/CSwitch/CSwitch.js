import { fieldable } from '@mixins';
import Element from '../Element';

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
      self.$emit('input', value);
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
    value: definition.value,
    inputValue: context.value,
  };

  return props;
};

export default {
  extends: Element,
  mixins: [
    fieldable,
  ],
  render() {
    const data = {
      attrs: getAttrs(this),
      props: getProps(this),
      on: getListeners(this),
    };

    return this.renderElement('v-switch', data);
  },
};
