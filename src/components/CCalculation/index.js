import Calculation from './CCalculation';

export default {
  install(Vue, options) {
    const name = `${options.namespace}calculation`;

    Vue.component(name, {
      extends: Calculation,
      namespace: options.namespace,
      name,
    });
  },
};
