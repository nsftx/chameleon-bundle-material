import { assign, each } from 'lodash';
import namespace from './index.namespace';
import * as components from './components';

require('./style/main-lite.styl');

export default {
  install(Vue, options) {
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
