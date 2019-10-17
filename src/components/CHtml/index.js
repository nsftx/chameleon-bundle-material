import Html from './CHtml';

export default {
  install(Vue, options) {
    const name = `${options.namespace}html`;

    Vue.component(name, {
      name,
      extends: Html,
      namespace: options.namespace,
    });
  },
};
