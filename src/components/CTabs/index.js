import Tabs from './CTabs';

export default {
  install(Vue, options) {
    const name = `${options.namespace}tabs`;

    Vue.component(name, {
      extends: Tabs,
      namespace: options.namespace,
      name,
    });
  },
};
