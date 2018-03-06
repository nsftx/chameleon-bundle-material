import Map from './CMap';

export default {
  install(Vue, options) {
    const name = `${options.namespace}map`;

    Vue.component(name, {
      extends: Map,
      namespace: options.namespace,
      name,
    });
  },
};
