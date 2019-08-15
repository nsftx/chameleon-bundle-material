import Repeater from './CRepeater';

export default {
  install(Vue, options) {
    const name = `${options.namespace}repeater`;

    Vue.component(name, {
      name,
      extends: Repeater,
      namespace: options.namespace,
    });
  },
};
