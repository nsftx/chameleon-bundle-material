import {
  VCard,
  VCardTitle,
  VSpacer,
  VIcon,
} from 'vuetify/lib';
import CImage from '../CImage/CImage';
import Card from './CCard';

export default {
  install(Vue, options) {
    const name = options && options.namespace
      ? `${options.namespace}card` : 'c-card';
    Vue.component(name, {
      name,
      components: {
        VCard,
        VCardTitle,
        VSpacer,
        VIcon,
        CImage,
      },
      extends: Card,
    });
  },
};
