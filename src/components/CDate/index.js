import Date from './CDate';

export default {
  install(Vue, options) {
    const name = `${options.namespace}date`;
    Vue.component(name, {
      name,
      extends: Date,
      namespace: options.namespace,
    });
  },
};
