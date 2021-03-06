import Vue from 'vue';
import vuetifyPlugin from './plugins/vuetify';
import Chameleon from './index';
import App from './App';

Vue.use(Chameleon, {
  isPreviewMode: true,
  staticAppAssets: {
    baseUrl: 'https://storage.googleapis.com/chameleon-storage-dev',
    /* eslint-disable no-template-curly-in-string */
    appUrl: '/apps/${appId}/assets',
    urlParams: {
      appId: '=$app.id',
    },
  },
  app: {
    pages: [
      {
        type: 'page',
        meta: {
          title: 'Home',
        },
        name: 'Home',
        icon: 'dashboard',
        path: '/',
        showInMenu: true,
        elements: [],
        theme: null,
        parent: null,
        _id: null,
      },
      {
        type: 'page',
        name: 'Contact',
        path: '/contact',
        showInMenu: true,
        parent: null,
        icon: 'perm_contact_calendar',
        meta: {
          title: 'Contact',
        },
        theme: null,
        _id: null,
      },
    ],
  },
});

vuetifyPlugin.init().then((vuetify) => {
/* eslint-disable no-new */
  new Vue({
    el: '#app',
    vuetify,
    components: { App },
    render(h) {
      return h(App);
    },
  });
});
