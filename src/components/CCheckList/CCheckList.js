import { isNil, map } from 'lodash';
import { fieldable, validatable } from '@mixins';
import Element from '../Element';

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
      self.$emit('input', value);
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
  extends: Element,
  mixins: [
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

    const data = {
      props: {
        color: 'transparent',
        flat: true,
      },
    };

    const children = [
      map(this.definition.dataSource.items,
        item => createElement('v-checkbox',
          {
            attrs: getItemAttrs(this),
            props: getItemProps(this, item),
            on: getItemListeners(this, item),
          },
        )),
      message,
    ];

    return this.renderElement('v-card', data, children);
  },
};
