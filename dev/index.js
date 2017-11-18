import Vue from 'vue';
import Chameleon from 'chameleon';
import App from './App';

Vue.use(Chameleon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
