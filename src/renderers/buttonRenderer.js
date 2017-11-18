import _isUndefined from 'lodash/isUndefined';

const getAttrs = (definition) => {
  const attrs = {
    name: definition.name,
    title: definition.tooltip,
  };

  return attrs;
};

const getProps = (definition) => {
  const props = {
    color: 'primary',
    icon: _isUndefined(definition.icon) ? false : definition.icon,
    loading: false,
  };

  return props;
};

const getListeners = (definition, context) => {
  const listeners = {
    click: () => {
      console.log('Call method =>', definition.method);
    },
  };

  // Assign listeners to inherited listeners
  return Object.assign(context.data.on, listeners);
};

export default {
  render(definition, createElement, context) {
    return createElement(
      'v-btn',
      {
        attrs: getAttrs(definition),
        props: getProps(definition),
        on: getListeners(definition, context),
      },
      [
        definition.label,
      ],
    );
  },
};
