import Text from './CText';

export default {
  install(Vue, options) {
    const name = `${options.namespace}text`;

    Vue.component(name, {
      extends: Text,
      namespace: options.namespace,
      name,
    });
  },
};
