import { assign, each } from 'lodash';
import namespace from './index.namespace';
import * as components from './components';

require('./style/main.styl');

export default {
  install(Vue, options) {
    // eslint-disable-next-line
    Vue.config.errorHandler = (error, vm, info) => {
      const handler = vm.$options.methods.errorHandler;
      if (handler) {
        handler.call(vm, error, info);
      }
    };
    // eslint-disable-next-line
    Vue.config.warnHandler = (warning, vm, trace) => {
      const handler = vm.$options.methods.warnHandler;
      if (handler) {
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
