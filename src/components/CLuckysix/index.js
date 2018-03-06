import Luckysix from './CLuckysix';

export default {
  install(Vue, options) {
    const name = `${options.namespace}luckysix`;

    Vue.component(name, {
      extends: Luckysix,
      namespace: options.namespace,
      name,
    });
  },
};
