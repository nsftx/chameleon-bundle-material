import Vlist from './CVlist';

export default {
  install(Vue, options) {
    const name = `${options.namespace}vlist`;

    Vue.component(name, {
      name,
      extends: Vlist,
      namespace: options.namespace,
    });
  },
};
