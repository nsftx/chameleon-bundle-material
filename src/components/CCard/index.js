import { VSpacer, VCardTitle } from 'vuetify/lib';
import { Image as CImage } from '../CImage';
import namespace from '../../index.namespace';
import Card from './CCard';

const install = {
  install(Vue, options) {
    const name = `${options.namespace}card`;

    Vue.component(name, {
      name,
      extends: Card,
      namespace: options.namespace,
    });
  },
};

// Register vuetify components used inside CImage
// (a la carte won't recognize them otherwise)
const nestedComponents = Object.keys(CImage.components);
Card.name = `${namespace}card`;
Card.components = {
  CImage,
  VSpacer,
  VCardTitle,
};
nestedComponents.forEach((comp) => { Card.components[comp] = CImage.components[comp]; });

export { install };
export { Card };
