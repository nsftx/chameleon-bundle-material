import Tags from './CTags';

export default {
  install(Vue, options) {
    const name = `${options.namespace}tags`;

    Vue.component(name, {
      extends: Tags,
      namespace: options.namespace,
      name,
    });
  },
};
