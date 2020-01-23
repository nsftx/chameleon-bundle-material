import { VBtn, VIcon } from 'vuetify/lib';
import Button from './CButton';

export default {
  install(Vue, options) {
    const name = options && options.namespace
      ? `${options.namespace}-button` : 'c-button';

    Vue.component(name, {
      name,
      components: {
        VBtn,
        VIcon,
      },
      extends: Button,
    });
  },
};
