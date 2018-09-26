import FloatingButtonItem from './CFloatingButtonItem';

export default {
  install(Vue, options) {
    const name = `${options.namespace}floating-button-item`;

    Vue.component(name, {
      extends: FloatingButtonItem,
      namespace: options.namespace,
      name,
    });
  },
};
