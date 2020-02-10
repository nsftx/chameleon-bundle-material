import {
  VDialog,
  VCard,
  VBtn,
  VToolbar,
  VSpacer,
  VIcon,
  VToolbarTitle,
  VCardActions,
} from 'vuetify/lib';
import Flyout from './CFlyout';
import Button from '../CButton';

const stringType = {
  type: String,
  default: null,
};

const booleanTrue = {
  type: Boolean,
  default: true,
};

const booleanFalse = {
  type: Boolean,
  default: true,
};

export default {
  install(Vue, options) {
    const name = options && options.namespace
      ? `${options.namespace}flyout` : 'c-flyout';
    Vue.component(name, {
      name,
      components: {
        VDialog,
        VCard,
        VBtn,
        VToolbar,
        VSpacer,
        VIcon,
        VToolbarTitle,
        VCardActions,
        Button,
      },
      extends: Flyout,
      props: {
        value: booleanFalse,
        name: stringType,
        fullscreen: booleanTrue,
        persistent: booleanFalse,
        headerTitle: stringType,
        width: {
          type: String,
          default: '60%',
        },
        hideOverlay: booleanTrue,
        showAvatar: booleanTrue,
        cancelLabel: stringType,
        submitLabel: stringType,
      },
    });
  },
};
