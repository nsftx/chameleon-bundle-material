import Select from './CSelect';

export default {
  install(Vue, options) {
    const name = `${options.namespace}select`;

    Vue.component(name, {
      name,
      extends: Select,
      namespace: options.namespace,
    });
  },
};
