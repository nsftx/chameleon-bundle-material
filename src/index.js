import Vuetify from 'vuetify';
import { version } from '../package.json';
import * as components from './components';

require('./stylus/main.styl');

const Library = {
  install(Vue, options = {}) {
    if (this.installed) return;
    this.installed = true;

    if (options.components) {
      Object.keys(options.components).forEach((key) => {
        const component = options.components[key];
        Vue.use(component);
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
