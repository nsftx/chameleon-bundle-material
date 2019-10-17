import Youtube from './CYoutube';

export default {
  install(Vue, options) {
    const name = `${options.namespace}youtube`;

    Vue.component(name, {
      name,
      extends: Youtube,
      namespace: options.namespace,
    });
  },
};
