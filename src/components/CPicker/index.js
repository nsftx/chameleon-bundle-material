import Picker from './CPicker';

export default {
  install(Vue, options) {
    const name = `${options.namespace}picker`;

    Vue.component(name, {
      extends: Picker,
      namespace: options.namespace,
      name,
    });
  },
};
