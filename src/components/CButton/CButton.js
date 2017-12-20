import _ from 'lodash';

const getAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
    title: context.definition.tooltip,
  };

  return attrs;
};

const getProps = (context) => {
  const definition = context.definition;
  const defaultColor = 'primary';

  const props = {
    color: definition.color || defaultColor,
    dark: true,
    icon: _.isUndefined(definition.icon) ? false : definition.icon,
    loading: false,
  };

  return props;
};

const getListeners = (context) => {
  const listeners = {};

  if (context.definition.actions) {
    _.each(context.definition.actions, (action, actionKey) => {
      listeners[actionKey] = () => {
        context.$emit(action);
      };
    });
  }

  return listeners;
};

export default {
  name: 'c-button',
  props: {
    definition: {
      type: Object,
      required: true,
    },
  },
  render(createElement) {
    const context = this;

    return createElement(
      'v-btn',
      {
        attrs: getAttrs(context),
        props: getProps(context),
        on: getListeners(context),
      },
      [
        context.definition.label,
      ],
    );
  },
};
