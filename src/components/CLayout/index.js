import Layout from './CLayout';

export default {
  install(Vue, options) {
    const name = `${options.namespace}layout`;

    Vue.component(name, {
      extends: Layout,
      namespace: options.namespace,
      name,
    });
  },
};
