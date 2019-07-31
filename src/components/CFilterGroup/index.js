import FilterGroup from './CFilterGroup';

export default {
  install(Vue, options) {
    const name = `${options.namespace}filter-group`;

    Vue.component(name, {
      extends: FilterGroup,
      namespace: options.namespace,
      name,
    });
  },
};
