import Image from './CImage';

export default {
  install(Vue, options) {
    const name = `${options.namespace}image`;

    Vue.component(name, {
      extends: Image,
      namespace: options.namespace,
      name,
    });
  },
};
