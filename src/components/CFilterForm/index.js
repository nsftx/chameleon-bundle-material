import FilterForm from './CFilterForm';

export default {
  install(Vue, options) {
    const name = `${options.namespace}filter-form`;

    Vue.component(name, {
      extends: FilterForm,
      namespace: options.namespace,
      name,
    });
  },
};
