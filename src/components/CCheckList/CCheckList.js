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
  const config = context.config;

  const attrs = {
    name: config.name,
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
  const config = context.config;

  const props = {
    label: item.label,
    hideDetails: true,
    prependIcon: config.prependIcon,
    appendIcon: config.appendIcon,
    persistentHint: config.persistentHint,
    inputValue: context.value,
    hint: config.hint,
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

    if (isNil(this.config.dataSource)) {
      this.config.dataSource = {
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
      map(this.config.dataSource.items,
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
