import { VCard, VDatePicker } from 'vuetify/lib';
import Picker from './CPicker';

const install = {
  install(Vue, options) {
    const name = `${options.namespace}picker`;

    Vue.component(name, {
      name,
      extends: Picker,
      namespace: options.namespace,
    });
  },
};

// Register vuetify components used inside CImage
// (a la carte won't recognize them otherwise)
Picker.components = {
  VCard,
  VDatePicker,
};

export { install };
export { Picker };
