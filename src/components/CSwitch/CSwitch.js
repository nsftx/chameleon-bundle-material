import { fieldable } from '@mixins';
import Element from '../Element';

const getAttrs = (context) => {
  const config = context.config;

  const attrs = {
    name: config.name,
  };

  return attrs;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    change(value) {
      self.value = value;
      const label = self.value ? context.config.label : '';
      self.sendToEventBus('Changed', { label });
      self.$emit('input', value);
    },
  };

  return listeners;
};

const getProps = (context) => {
  const config = context.config;

  const props = {
    appendIcon: config.appendIcon,
    hint: config.hint,
    label: config.label,
    persistentHint: config.persistentHint,
    placeholder: config.placeholder,
    prependIcon: config.prependIcon,
    disabled: config.disabled,
    color: config.color,
    value: config.value || false,
    inputValue: context.value || false,
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
