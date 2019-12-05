import { VIcon, VCard } from 'vuetify/lib';
import Image from './CImage';

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
  VIcon,
  VCard,
};

export { install };
export { Image };
