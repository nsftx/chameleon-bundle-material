<template>
  <v-app>
    <v-navigation-drawer fixed></v-navigation-drawer>
    <v-toolbar fixed></v-toolbar>
    <v-content>
      <v-container fluid>
        <chameleon-form></chameleon-form>
      </v-container>
    </v-content>
    <v-footer></v-footer>
  </v-app>
</template>

<script>
  import ChameleonForm from './components/ChameleonForm';

  export default {
    name: 'app',
    components: {
      ChameleonForm,
    },
  };
</script>
