import { VMenu, VTextField } from 'vuetify/lib';
import Date from './CDate';
import { Picker } from '../CPicker';

const install = {
  install(Vue, options) {
    const name = `${options.namespace}date`;
    Vue.component(name, {
      name,
      extends: Date,
      namespace: options.namespace,
    });
  },
};

// Register vuetify components used inside CImage
// (a la carte won't recognize them otherwise)
Date.components = {
  VMenu,
  VTextField,
  CPicker: Picker,
};

export { install };
export { Date };
