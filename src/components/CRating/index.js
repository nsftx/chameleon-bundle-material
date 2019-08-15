import Rating from './CRating';

export default {
  install(Vue, options) {
    const name = `${options.namespace}rating`;

    Vue.component(name, {
      name,
      extends: Rating,
      namespace: options.namespace,
    });
  },
};
