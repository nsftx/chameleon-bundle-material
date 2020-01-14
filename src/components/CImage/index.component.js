import {
  VImg,
  VIcon,
  VCard,
} from 'vuetify/lib';
import Image from './CImage';

export default {
  install(Vue, options) {
    const name = options.namespace
      ? `${options.namespace}image` : 'c-image';
    Vue.component(name, {
      name,
      namespace: options.namespace,
      components: {
        VImg,
        VIcon,
        VCard,
      },
      extends: Image,
    });
  },
};
