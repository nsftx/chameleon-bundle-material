import CheckList from './CCheckList';

export default {
  install(Vue, options) {
    const name = `${options.namespace}check-list`;

    Vue.component(name, {
      name,
      extends: CheckList,
      namespace: options.namespace,
    });
  },
};
