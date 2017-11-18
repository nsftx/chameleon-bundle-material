import Vuetify from 'vuetify';
import { version } from '../package.json';
import * as components from './components';

function ChameleonVuetify(Vue, args) {
  const Chameleon = components.Chameleon;

  Vue.use(Vuetify);
  Vue.use(Chameleon, {
    components,
    ...args,
  });
}

ChameleonVuetify.version = version;

export default ChameleonVuetify;
