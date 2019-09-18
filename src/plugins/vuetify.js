import Vue from 'vue';
import Vuetify from 'vuetify';
import { each } from 'lodash';
import 'vuetify/dist/vuetify.min.css';
import manifest from '../../build/manifest.json';

const { components } = manifest.plugins.vuetify;
components.push(
  'VApp',
  'VAppBar',
  'VAppBarNavIcon',
  'VToolbarTitle',
  'VFooter',
);

const importComponents = () => {
  const importPromise = import('vuetify/lib').then((vuetifyModule) => {
    const vuetifyComponents = {};
    each(components, (component) => {
      vuetifyComponents[component] = vuetifyModule[component];
    });

    return vuetifyComponents;
  });

  return importPromise;
};

export default {
  init() {
    return importComponents().then((importedComponents) => {
      Vue.use(Vuetify, { components: importedComponents });

      return new Vuetify({
        icons: {
          iconfont: 'md',
        },
        theme: {
          themes: {
            light: {
              primary: '#01a952',
            },
            dark: {
              primary: '#01a952',
            },
          },
        },
      });
    });
  },
};
