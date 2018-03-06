import Check from './CCheck';

export default {
  install(Vue, options) {
    const name = `${options.namespace}check`;

    Vue.component(name, {
      extends: Check,
      namespace: options.namespace,
      name,
    });
  },
};
