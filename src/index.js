import { assign, each } from 'lodash';
import namespace from './index.namespace';
import * as components from './components';

require('./style/main.styl');

export default {
  install(Vue, options) {
    // eslint-disable-next-line
    Vue.config.errorHandler = (error, vm, info) => {
      const self = vm && vm.error ? vm : vm.$parent;

      const handler = self.$options.methods.errorHandler;
      if (handler) {
        handler.call(self, error, info);
      } else {
        // eslint-disable-next-line
        console.error(error);
      }
    };
    // eslint-disable-next-line
    Vue.config.warnHandler = (warning, vm, trace) => {
      const self = vm && vm.warning ? vm : vm.$parent;

      const handler = self.$options.methods.warnHandler;
      if (handler) {
        handler.call(self, warning, trace);
      } else {
        // eslint-disable-next-line
        console.error(`[Vue warn]: ${warning}${trace}`);
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
