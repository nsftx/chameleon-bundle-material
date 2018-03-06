import SelectList from './CSelectList';

export default {
  install(Vue, options) {
    const name = `${options.namespace}select-list`;

    Vue.component(name, {
      extends: SelectList,
      namespace: options.namespace,
      name,
    });
  },
};
