import Tags from './CTags';

export default {
  install(Vue, options) {
    const name = `${options.namespace}tags`;

    Vue.component(name, {
      name,
      extends: Tags,
      namespace: options.namespace,
    });
  },
};
