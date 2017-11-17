<template>
  <v-app>
    <v-toolbar app
               dark
               fixed
               color="primary">
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-form>
          <c-control :definition="field"
                     :key="field.name"
                     v-model="model[field.name]"
                     v-for="field in form.fields">
          </c-control>
        </v-form>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
  import CControl from './components/CControl/CControl';

  // This will come from Chameleon API
  const source = require('../static/data/form.json');

  export default {
    name: 'app',
    components: {
      CControl,
    },
    data() {
      return {
        source,
        model: {
          firstName: 'Ime Prezime',
          creditCard: '0000-2222-6666-5555',
        },
      };
    },
    computed: {
      form() {
        const container = this.source.containers.default;
        const form = container.forms.default;
        return form;
      },
    },
  };
</script>
