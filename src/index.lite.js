import { version } from '../package.json';
import namespace from './index.namespace';
import * as components from './components';

require('./style/main-lite.styl');

const Library = {
  install(Vue, options = {}) {
    if (this.installed) return;
    this.installed = true;

    // eslint-disable-next-line
    Vue.prototype.$chameleon = new Vue({
      data: {
        validators: options.validators,
        isPreviewMode: options.isPreviewMode,
      },
    });

    if (options.components) {
      Object.keys(options.components).forEach((key) => {
        const component = options.components[key];
        Vue.use(component, {
          namespace,
        });
      });
    }
  },
};

function Chameleon(Vue, args) {
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
