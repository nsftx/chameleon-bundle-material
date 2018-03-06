import Placeholder from './CPlaceholder';

export default {
  install(Vue, options) {
    const name = `${options.namespace}placeholder`;

    Vue.component(name, {
      extends: Placeholder,
      namespace: options.namespace,
      name,
    });
  },
};
