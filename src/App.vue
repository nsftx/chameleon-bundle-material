<template>
  <v-app>
    <v-navigation-drawer app
                         fixed>
    </v-navigation-drawer>
    <v-toolbar app
               fixed>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <c-control :definition="field"
                   :key="field.name"
                   v-model="model[field.name]"
                   v-for="field in form.containers.default.fields">
        </c-control>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
  import CControl from './components/CControl/CControl';

  const form = require('../static/data/form.json');

  export default {
    name: 'app',
    components: {
      CControl,
    },
    data() {
      return {
        form,
        model: {
          firstName: 'Ime Prezine',
          creditCard: '000-222-666-555',
        },
      };
    },
  };
</script>
