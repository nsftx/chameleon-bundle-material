import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VuetifyColors from 'vuetify/es5/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    themes: {
      light: {
        primary: '#01a952',
        secondary: VuetifyColors.grey.darken1,
        accent: VuetifyColors.green.accent4,
      },
      dark: {
        primary: '#01a952',
        secondary: VuetifyColors.grey.darken1,
        accent: VuetifyColors.green.accent4,
      },
    },
  },
});
