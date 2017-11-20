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
  // This will come from Chameleon API
  const json = require('./page.json');

  export default {
    name: 'app',
    data() {
      return {
        source: null,
      };
    },
    computed: {
      form() {
        if (this.source) {
          const container = this.source.containers.default;
          const form = container.forms[0];
          return form;
        }

        return null;
      },
    },
    methods: {
      sourceChanged(value) {
        console.log('JSON changed =>', value);
      },
    },
    mounted() {
      this.source = json;
    },
  };
</script>
