import { map, isNil, filter } from 'lodash';
import { fieldable, validatable } from '@mixins';
import { validator } from '@validators';
import Element from '../Element';

const getListeners = (context) => {
  const self = context;

  const listeners = {
    change(payload) {
      self.value = payload;
      const items = self.value;
      self.sendToEventBus('Changed', { items });
      self.$emit('input', payload);
    },
  };

  return listeners;
};

const getPropRequired = (config) => {
  if (config.validation) {
    return !!config.validation.required;
  }

  return false;
};

const getProps = (context) => {
  const config = context.config;

  const props = {
    appendIcon: config.appendIcon,
    dark: context.isThemeDark,
    light: context.isThemeLight,
    label: config.label,
    hint: config.hint,
    persistentHint: config.persistentHint,
    prependIcon: config.prependIcon,
    required: getPropRequired(config),
    rules: validator.getRules(config, context.validators),
    value: config.value,
  };

  return props;
};

const getItemProps = (context, item) => {
  if (isNil(context.dataSource)) return null;

  const config = context.config;
  const mapProps = filter(context.dataSource.schema, i => !isNil(i.mapName));
  const itemProps = Object.keys(item);
  const value = !mapProps.length ? item[itemProps[0]] : item.value;
  const label = String(!mapProps.length ? item[itemProps[1] || itemProps[0]] : item.label);

  const props = {
    value,
    label,
    color: config.color,
    disabled: config.disabled,
  };

  return props;
};

export default {
  extends: Element,
  mixins: [
    fieldable,
    validatable,
  ],
  watch: {
    dataSource: {
      handler() {
        this.loadData();
      },
    },
  },
  render(createElement) {
    const data = {
      attrs: {
        name: this.config.name,
      },
      props: getProps(this),
      on: getListeners(this),
    };

    let children = null;

    if (!isNil(this.items)) {
      children = map(this.items,
        item => createElement('v-radio',
          {
            props: getItemProps(this, item),
          },
        ));
    }

    return this.renderElement('v-radio-group', data, children);
  },
};
