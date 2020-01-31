import {
  VDialog,
} from 'vuetify/lib';
import Flyout from './CFlyout';

export default {
  install(Vue, options) {
    const name = options && options.namespace
      ? `${options.namespace}flyout` : 'c-flyout';
    Vue.component(name, {
      name,
      components: {
        VDialog,
      },
      extends: Flyout,
    });
  },
};
