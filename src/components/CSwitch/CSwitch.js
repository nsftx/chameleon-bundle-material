import { fieldable, validatable } from '@/mixins';
import Element from '../Element';

const getAttrs = (context) => {
  const { config } = context;

  const attrs = {
    name: config.name,
  };

  return attrs;
};

const changeValue = (value, context) => {
  const self = context;
  self.value = value;
  const label = self.value ? context.config.label : '';
  self.sendToEventBus('Changed', { label });
  self.$emit('input', value);
};

const getListeners = (context) => {
  const listeners = {
    change(value) {
      changeValue(value, context);
    },
    input(value) {
      changeValue(value, context);
    },
  };

  return listeners;
};

const getProps = (context) => {
  const { config } = context;

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
    validatable,
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
