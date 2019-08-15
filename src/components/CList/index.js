import List from './CList';

export default {
  install(Vue, options) {
    const name = `${options.namespace}list`;

    Vue.component(name, {
      name,
      extends: List,
      namespace: options.namespace,
    });
  },
};
