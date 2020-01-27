import {
  VCard,
  VCardTitle,
  VSpacer,
  VIcon,
} from 'vuetify/lib';
import CImage from '../CImage/CImage';
import Card from './CCard';

const stringType = {
  type: String,
  default: null,
};

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
      props: {
        backgroundImage: stringType,
        color: stringType,
        flat: {
          type: Boolean,
          default: true,
        },
        icon: stringType,
        image: stringType,
        imageHeight: stringType,
        imageWidth: stringType,
        indicatorColor: stringType,
        outlined: {
          type: Boolean,
          default: false,
        },
        showMenu: {
          type: Boolean,
          value: false,
        },
        statusIcon: stringType,
        statusText: stringType,
        subtitle: stringType,
        title: stringType,
        // theme: stringType,
        thumb: stringType,
        variation: stringType,
      },
    });
  },
};
