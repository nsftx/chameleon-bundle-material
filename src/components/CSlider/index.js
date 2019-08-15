import Slider from './CSlider';

export default {
  install(Vue, options) {
    const name = `${options.namespace}slider`;

    Vue.component(name, {
      name,
      extends: Slider,
      namespace: options.namespace,
    });
  },
};
