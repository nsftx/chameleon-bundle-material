import RadioList from './CRadioList';

export default {
  install(Vue, options) {
    const name = `${options.namespace}radio-list`;

    Vue.component(name, {
      name,
      extends: RadioList,
      namespace: options.namespace,
    });
  },
};
