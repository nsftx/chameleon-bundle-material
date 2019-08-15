import FloatingButton from './CFloatingButton';

export default {
  install(Vue, options) {
    const name = `${options.namespace}floating-button`;

    Vue.component(name, {
      name,
      extends: FloatingButton,
      namespace: options.namespace,
    });
  },
};
