import Gallery from './CGallery';

export default {
  install(Vue, options) {
    const name = `${options.namespace}gallery`;

    Vue.component(name, {
      name,
      extends: Gallery,
      namespace: options.namespace,
    });
  },
};
