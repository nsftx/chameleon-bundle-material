import Form from './CForm';

export default {
  install(Vue, options) {
    const name = `${options.namespace}form`;

    Vue.component(name, {
      extends: Form,
      namespace: options.namespace,
      name,
    });
  },
};
