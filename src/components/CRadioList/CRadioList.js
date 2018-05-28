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
      const items = self.value;
      self.sendToEventBus('Changed', { items });
      self.$emit('input', payload);
      self.validate();
    },
  };

  return listeners;
};

const getProps = (context) => {
  const config = context.config;

  const props = {
    appendIcon: config.appendIcon,
    hint: config.hint,
    persistentHint: config.persistentHint,
    prependIcon: config.prependIcon,
    value: config.value,
  };

  return props;
};

const getItemProps = (context, item) => {
  const config = context.config;

  const props = {
    label: item.label,
    value: item.value,
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
  methods: {
    loadData() {
      this.loadConnectorData().then((result) => {
        this.config.dataSource.items = result.items || [];
      });
    },
  },
  mounted() {
    this.loadData();
  },
  render(createElement) {
    const message = createErrorMessage(createElement, this);

    if (isNil(this.config.dataSource)) {
      this.config.dataSource = {
        items: [],
      };
    }

    const data = {
      attrs: {
        name: this.config.name,
      },
      props: getProps(this),
      on: getListeners(this),
    };

    const children = [
      map(this.config.dataSource.items,
        item => createElement('v-radio',
          {
            props: getItemProps(this, item),
          },
        )),
      message,
    ];

    return this.renderElement('v-radio-group', data, children);
  },
};
