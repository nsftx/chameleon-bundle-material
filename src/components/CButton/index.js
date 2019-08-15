import Button from './CButton';

export default {
  install(Vue, options) {
    const name = `${options.namespace}button`;

    Vue.component(name, {
      name,
      extends: Button,
      namespace: options.namespace,
    });
  },
};
