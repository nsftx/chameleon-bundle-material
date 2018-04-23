import { map, isNil } from 'lodash';
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

const getListeners = (context) => {
  const self = context;

  const listeners = {
    change(payload) {
      self.value = payload;
      self.$emit('input', payload);
      self.validate();
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
    prependIcon: definition.prependIcon,
    value: definition.value,
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
      attrs: {
        name: this.definition.name,
      },
      props: getProps(this),
      on: getListeners(this),
    };

    const children = [
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
      message,
    ];

    return this.renderElement('v-radio-group', data, children);
  },
};
