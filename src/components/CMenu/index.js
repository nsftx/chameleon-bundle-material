import Menu from './CMenu';

export default {
  install(Vue, options) {
    const name = `${options.namespace}menu`;

    Vue.component(name, {
      name,
      extends: Menu,
      namespace: options.namespace,
    });
  },
};
