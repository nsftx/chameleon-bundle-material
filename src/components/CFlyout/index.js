import Flyout from './CFlyout';

export default {
  install(Vue, options) {
    const name = `${options.namespace}Flyout`;

    Vue.component(name, {
      name,
      extends: Flyout,
      namespace: options.namespace,
    });
  },
};
