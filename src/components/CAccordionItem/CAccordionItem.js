import Element from '../Element';

const getItemHeader = (element, createElement) => {
  const el = createElement(
    'v-expansion-panel-header',
    element.title,
  );

  return el;
};

const getItemContent = (context, createElement) => {
  const element = context.config;

  const el = createElement(
    'v-expansion-panel-content',
    {
      staticClass: element.contentColor,
    },
    [
      context.renderChildElement('v-card-text'),
    ],
  );

  return el;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    input(value) {
      // Same event gets emited for every expansion panel being toggled
      // distinguishing them by value: true || false
      self.$emit('change', {
        value,
        index: self.$attrs.tabIndex,
        item: self.config,
      });
    },
  };

  return listeners;
};

export default {
  extends: Element,
  render(createElement) {
    const data = {
      key: this.schema.uid,
      props: this.config,
      on: getListeners(this),
      staticClass: this.config.headerColor,
    };

    const children = [
      getItemHeader(this.config, createElement),
      getItemContent(this, createElement),
    ];

    return this.renderElement(
      'v-expansion-panel',
      data,
      children,
      true,
    );
  },
};
