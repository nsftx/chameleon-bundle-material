<template>
  <main>
    <v-app>
      <v-toolbar app
                 dark
                 fixed
                 color="primary">
      </v-toolbar>
      <v-content>
        <v-container fluid
                     grid-list-lg
                     v-if="source">
          <v-layout row
                    wrap>
            <v-flex xs12
                    md6>
              <v-card>
                <v-card-text>
                  <v-jsoneditor v-model="source"
                                @input="sourceChanged">
                  </v-jsoneditor>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12
                    md6>
              <v-card>
                <c-form :definition="form"
                        :validators="source.validators">
                </c-form>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer app></v-footer>
    </v-app>
  </main>
</template>

<script>
  import VJsoneditor from 'vue-jsoneditor';
  import chameleonNotation from 'chameleon-notation';

  // This will come from Chameleon API
  const json = require('./page.json');

  export default {
    name: 'app',
    components: {
      VJsoneditor,
    },
    data() {
      return {
        source: null,
      };
    },
    computed: {
      form() {
        if (this.source) {
          const form = this.source.containers[0].widgets[0];
          const validation = chameleonNotation.validate(form);

          if (!validation.isValid) {
            console.warn(validation.message);
          }

          return form;
        }

        return null;
      },
    },
    methods: {
      sourceChanged(value) {
        // console.log('JSON changed =>', JSON.stringify(value));
      },
    },
    mounted() {
      this.source = json;
    },
  };
</script>
