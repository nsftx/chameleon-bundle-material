import SelectList from './CSelectList';

export default {
  install(Vue, options) {
    const name = `${options.namespace}select-list`;

    Vue.component(name, {
      name,
      extends: SelectList,
      namespace: options.namespace,
    });
  },
};
