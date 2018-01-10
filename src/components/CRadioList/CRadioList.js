import _ from 'lodash';

const getAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
    inputValue: context.definition.inputValue,
  };

  return attrs;
};

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

const getProps = (context) => {
  const definition = context.definition;

  const props = {
    appendIcon: definition.appendIcon,
    hint: definition.hint,
    persistentHint: definition.persistentHint,
    placeholder: definition.placeholder,
    prependIcon: definition.prependIcon,
    disabled: definition.disabled,
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
  render(createElement) {
    return createElement(
      'v-radio-group',
      {
        attrs: getAttrs(this),
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
