import Switch from './CSwitch';

export default {
  install(Vue, options) {
    const name = `${options.namespace}switch`;

    Vue.component(name, {
      extends: Switch,
      namespace: options.namespace,
      name,
    });
  },
};
