import Vue from 'vue';
import VJsoneditor from 'vue-jsoneditor';
import Chameleon from 'chameleon';
import App from './App';

Vue.use(VJsoneditor);
Vue.use(Chameleon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
