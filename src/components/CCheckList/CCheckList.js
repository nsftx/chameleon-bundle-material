import { isNil, map } from 'lodash';
import { elementable, fieldable, validatable } from '@mixins';

const createErrorMessage = (createElement, context) => {
  const el = createElement(
    'div',
    {
      staticClass: 'input-group__details error--text',
    },
    context.errorBucket[0],
  );

  return el;
};

const getItemAttrs = (context) => {
  const definition = context.definition;

  const attrs = {
    name: definition.name,
  };

  return attrs;
};

const getItemListeners = (context) => {
  const self = context;

  const listeners = {
    change(value) {
      self.value = value;
      self.$emit('change', value);
      self.validate();
    },
  };

  return listeners;
};

const getItemProps = (context, item) => {
  const definition = context.definition;

  const props = {
    label: item.label,
    hideDetails: true,
    prependIcon: definition.prependIcon,
    appendIcon: definition.appendIcon,
    persistentHint: definition.persistentHint,
    inputValue: context.value,
    hint: definition.hint,
    disabled: item.disabled,
    color: item.color,
    value: item.value,
  };

  return props;
};

export default {
  name: 'check-list',
  mixins: [
    elementable,
    fieldable,
    validatable,
  ],
  render(createElement) {
    const message = createErrorMessage(createElement, this);

    if (isNil(this.definition.dataSource)) {
      this.definition.dataSource = {
        items: [],
      };
    }

    return createElement(
      'v-card',
      {
        props: {
          color: 'transparent',
          flat: true,
        },
        staticClass: `${this.baseClass} ${this.$options.name}`,
      },
      [
        map(this.definition.dataSource.items,
          item => createElement('v-checkbox',
            {
              attrs: getItemAttrs(this),
              props: getItemProps(this, item),
              on: getItemListeners(this, item),
            },
          )),
        message,
      ],
    );
  },
};
