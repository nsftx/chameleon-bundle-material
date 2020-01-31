import {
  VBtn,
  VIcon,
  VSpeedDial,
} from 'vuetify/lib';
import FloatingButton from './CFloatingButton';
import CButton from '../CButton/CButton';

CButton.components = {
  VBtn,
  VIcon,
};

export default {
  install(Vue, options) {
    const name = options && options.namespace
      ? `${options.namespace}floating-button` : 'c-floating-button';

    Vue.component(name, {
      name,
      components: {
        VSpeedDial,
        CButton,
      },
      extends: FloatingButton,
    });
  },
};
