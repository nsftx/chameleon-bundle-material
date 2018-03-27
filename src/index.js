import Vuetify from 'vuetify';
import { assign, each } from 'lodash';
import { version } from '../package.json';
import namespace from './index.namespace';
import * as components from './components';

require('./style/main.styl');

const Library = {
  install(Vue, options = {}) {
    if (this.installed) return;
    this.installed = true;

    // eslint-disable-next-line
    Vue.prototype.$chameleon = new Vue({
      data: assign({}, options),
    });

    if (options.components) {
      each(options.components, (component) => {
        Vue.use(component, {
          namespace,
        });
      });
    }
  },
};

function Chameleon(Vue, args) {
  Vue.use(Vuetify);
  Vue.use(Library, {
    components,
    ...args,
  });
}

Chameleon.version = version;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Chameleon);
}

export default Chameleon;
