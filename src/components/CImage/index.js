import { VImg, VIcon, VCard } from 'vuetify/lib';
import Image from './CImage';
import namespace from '../../index.namespace';

const install = {
  install(Vue, options) {
    const name = `${options.namespace}image`;

    Vue.component(name, {
      name,
      extends: Image,
      namespace: options.namespace,
    });
  },
};

// Register vuetify components used inside CImage
// (a la carte won't recognize them otherwise)
Image.components = {
  VImg,
  VIcon,
  VCard,
};

Image.name = `${namespace}image`;

export { install };
export { Image };
