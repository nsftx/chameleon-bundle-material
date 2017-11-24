import _isUndefined from 'lodash/isUndefined';
import _each from 'lodash/each';

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
    icon: _isUndefined(definition.icon) ? false : definition.icon,
    loading: false,
  };

  return props;
};

const getListeners = (context) => {
  const listeners = {};

  if (context.definition.actions) {
    _each(context.definition.actions, (action, actionKey) => {
      listeners[actionKey] = () => {
        context.$emit(context.definition.name);
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
