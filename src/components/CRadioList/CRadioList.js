import { map, isNil } from 'lodash';
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

    const children = [
      createElement(
        'v-radio-group',
        {
          attrs: {
            name: this.definition.name,
          },
          props: getProps(this),
          on: getListeners(this),
        },
        [
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
        ],
      ),
    ];

    return createElement('div', {
      attrs: this.getSchemaAttributes(),
      staticClass: `${this.baseClass} ${this.$options.name}`,
    }, children);
  },
};
