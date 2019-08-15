import Tabs from './CTabs';

export default {
  install(Vue, options) {
    const name = `${options.namespace}tabs`;

    Vue.component(name, {
      name,
      extends: Tabs,
      namespace: options.namespace,
    });
  },
};
