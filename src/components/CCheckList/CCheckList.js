import { isNil, map } from 'lodash';
import namespace from '@namespace';
import { elementable, fieldable } from '@mixins';
import { validator } from '@validators';

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
    },
  };

  return listeners;
};

const getPropRequired = (definition) => {
  if (definition.validation) {
    return !!definition.validation.required;
  }

  return false;
};

const getPropValidateOnBlur = (definition) => {
  if (definition.validation && definition.validateOn) {
    return definition.validateOn === 'blur';
  }

  return false;
};

const getItemProps = (context, item) => {
  const definition = context.definition;

  const props = {
    label: item.label,
    hideDetails: definition.hideDetails,
    prependIcon: definition.prependIcon,
    appendIcon: definition.appendIcon,
    persistentHint: definition.persistentHint,
    inputValue: context.value,
    hint: definition.hint,
    minCount: definition.validation.minCount,
    maxCount: definition.validation.maxCount,
    disabled: item.disabled,
    color: item.color,
    value: item.value,
    validateOn: getPropValidateOnBlur(definition),
    required: getPropRequired(definition),
    rules: validator.getRules(definition, context.$chameleon.validators),
  };

  return props;
};

export default {
  name: `${namespace}check-list`,
  mixins: [
    elementable,
    fieldable,
  ],
  render(createElement) {
    if (isNil(this.definition.dataSource)) {
      this.definition.dataSource = {
        items: [],
      };
    }

    return createElement(
      'v-card',
      {
        attrs: this.getSchemaAttributes(),
        props: {
          color: 'transparent',
          flat: true,
        },
        staticClass: `${this.baseClass} ${this.$options.name}`,
      },
      map(this.definition.dataSource.items,
        item => createElement('v-checkbox',
          {
            attrs: getItemAttrs(this),
            props: getItemProps(this, item),
            on: getItemListeners(this, item),
          },
        )),
    );
  },
};
