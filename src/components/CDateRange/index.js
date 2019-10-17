import DateRange from './CDateRange';

export default {
  install(Vue, options) {
    const name = `${options.namespace}date-range`;

    Vue.component(name, {
      name,
      extends: DateRange,
      namespace: options.namespace,
    });
  },
};
