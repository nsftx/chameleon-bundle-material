import Vue from 'vue';
import Vuetify from 'vuetify';
import Chameleon from 'chameleon';
import App from './App';
import 'vuetify/src/stylus/main.styl';

Vue.use(Vuetify);

Vue.use(Chameleon, {
  isPreviewMode: true,
  app: {
    pages: [
      {
        type: 'page',
        meta: {
          title: 'Home',
          icon: 'dashboard',
        },
        name: 'Home',
        path: '/',
        elements: [],
        theme: null,
        parent: null,
        layout: {
          previewWidth: '960px',
          previewHeight: '1360px',
          overflow: 'hidden',
        },
        _id: null,
      },
      {
        type: 'page',
        name: 'Contact',
        path: '/contact',
        parent: null,
        layout: {
          previewWidth: '960px',
          previewHeight: '1360px',
          overflow: 'hidden',
        },
        meta: {
          title: 'Contact',
          icon: 'perm_contact_calendar',
        },
        theme: null,
        _id: null,
      },
    ],
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
