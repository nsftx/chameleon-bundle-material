import Hlist from './CHlist';

export default {
  install(Vue, options) {
    const name = `${options.namespace}hlist`;

    Vue.component(name, {
      extends: Hlist,
      namespace: options.namespace,
      name,
    });
  },
};
