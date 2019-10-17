import Treeview from './CTreeview';

export default {
  install(Vue, options) {
    const name = `${options.namespace}treeview`;

    Vue.component(name, {
      name,
      extends: Treeview,
      namespace: options.namespace,
    });
  },
};
