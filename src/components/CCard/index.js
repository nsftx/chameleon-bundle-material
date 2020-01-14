import Card from './CCard';

export default {
  install(Vue, options) {
    const name = `${options.namespace}card`;
    Vue.component(name, {
      name,
      namespace: options.namespace,
      extends: Card,
    });
  },
};
