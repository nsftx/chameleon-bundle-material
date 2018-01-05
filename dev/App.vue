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
              <v-card v-if="page" class="mb-1">
                <c-form :definition="form"
                        :validators="page.validators">
                </c-form>
              </v-card>
              <v-card v-if="page">
                <c-video :definition="video"
                         :validators="page.validators">
                </c-video>
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
        source: json,
        page: null,
      };
    },
    computed: {
      form() {
        if (this.page) {
          const form = this.page.containers[0].widgets[0];

          const validation = chameleonNotation.validate(form);
          if (!validation.isValid) {
            console.warn(validation.message);
          }

          return form;
        }

        return null;
      },
      video() {
        if(this.page) {
          return this.page.containers[0].widgets[1];
        }

        return null;
      },
    },
    methods: {
      sourceChanged(value) {
        this.page = value;
      },
    },
  };
</script>
