import Vuetify from 'vuetify';
import { version } from '../package.json';
import * as components from './components';

function Chameleon(Vue, args) {
  Vue.use(Vuetify);
  Vue.use(components.Chameleon, {
    components,
    ...args,
  });
}

Chameleon.version = version;

export default Chameleon;
