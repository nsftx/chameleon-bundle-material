import Page from './CPage';

export default {
  install(Vue, options) {
    const name = `${options.namespace}page`;

    Vue.component(name, {
      extends: Page,
      namespace: options.namespace,
      name,
    });
  },
};
