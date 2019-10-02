import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { each } from 'lodash';
import manifest from '../../build/manifest.json';

const { components } = manifest.plugins.vuetify;
components.push(
  'VApp',
  'VAppBar',
  'VAlert',
  'VAppBarNavIcon',
  'VToolbarTitle',
  'VFooter',
);

const importComponents = () => {
  const importPromise = import('vuetify/lib').then((vuetifyModule) => {
    const vuetifyComponents = {};
    const vuetifyDirectives = {
      Scroll: vuetifyModule.Scroll,
    };
    each(components, (component) => {
      vuetifyComponents[component] = vuetifyModule[component];
    });

    return {
      components: vuetifyComponents,
      directives: vuetifyDirectives,
    };
  });

  return importPromise;
};

export default {
  init() {
    return importComponents().then((imported) => {
      Vue.use(Vuetify, {
        components: imported.components,
        directives: imported.directives,
      });

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
