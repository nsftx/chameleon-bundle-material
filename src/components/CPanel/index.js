import Panel from './CPanel';

export default {
  install(Vue, options) {
    const name = `${options.namespace}panel`;

    Vue.component(name, {
      name,
      extends: Panel,
      namespace: options.namespace,
    });
  },
};
