import { isNil, map, filter } from 'lodash';
import { fieldable, validatable } from '@mixins';
import { validator } from '@validators';
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
      const items = self.value;
      self.sendToEventBus('Changed', { items });
      self.$emit('input', value);
      self.validate();
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

const getItemProps = (context, item) => {
  const config = context.config;

  const mapProps = filter(context.dataSource.schema, i => !isNil(i.mapName));
  const itemProps = Object.keys(item);
  const value = !mapProps.length ? item[itemProps[0]] : item.value;
  const label = String(!mapProps.length ? item[itemProps[1] || itemProps[0]] : item.label);

  const props = {
    label,
    hideDetails: true,
    prependIcon: config.prependIcon,
    appendIcon: config.appendIcon,
    inputValue: context.value || [],
    hint: config.hint,
    disabled: config.disabled,
    color: config.color,
    required: getPropRequired(config),
    rules: validator.getRules(config, context.validators),
    value,
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
  methods: {
    loadData() {
      this.loadConnectorData().then((result) => {
        this.config.dataSource.items = result.items || [];
      });
    },
  },
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
        dark: this.isThemeDark,
        light: this.isThemeLight,
        flat: true,
      },
    };

    const children = [
      createElement('v-label', this.config.label),
      map(this.config.dataSource.items,
        item => createElement('v-checkbox',
          {
            attrs: getItemAttrs(this),
            staticClass: 'mt-0',
            props: getItemProps(this, item),
            on: getItemListeners(this, item),
          },
        )),
      message,
    ];

    return this.renderElement('v-card', data, children);
  },
};
