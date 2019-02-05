import { assign, each } from 'lodash';
import namespace from './index.namespace';
import * as components from './components';

require('./style/main.styl');

export default {
  install(Vue, options) {
    // eslint-disable-next-line
    Vue.config.errorHandler = (error, vm, info) => {
      let handler;
      if (vm.$options.methods.errorHandler) {
        handler = vm.$options.methods.errorHandler;
        handler.call(vm, error, info);
      }
    };
    // eslint-disable-next-line
    Vue.config.warnHandler = (warning, vm, trace) => {
      let handler;

      if (vm.$options.methods.warnHandler) {
        handler = vm.$options.methods.warnHandler;
        handler.call(vm, warning, trace);
      }
    };

    if (options) {
      // eslint-disable-next-line
      Vue.prototype.$chameleon = new Vue({
        data: assign({}, options),
      });
    }

    each(components, (component) => {
      Vue.use(component, {
        namespace,
      });
    });
  },
};

