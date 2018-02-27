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
              <div v-if="app">
                <c-page :definition="app.pages[0]"
                        :validators="app.validators">
                </c-page>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer app></v-footer>
    </v-app>
  </main>
</template>

<script>
  import _ from 'lodash';
  import VJsoneditor from 'vue-jsoneditor';
  import chameleonNotation from 'chameleon-notation';

  const getComponentTag = (name) => {
    const tag = _.kebabCase(name);
    return `c-${tag}`;
  };

  // This will come from Chameleon API
  const json = require('./data/app.json');

  export default {
    name: 'app',
    components: {
      VJsoneditor,
    },
    data() {
      return {
        source: json,
        app: null,
      };
    },
    methods: {
      getContainerDefinition(index) {
        return this.app.pages[0].elements[index];
      },
      sourceChanged(value) {
        this.app = value;
        const validation = chameleonNotation.validate(this.app);

        if (!validation.isValid) {
          // console.warn(validation.message);
        }
      },
    },
    mounted() {
      _.assign(this.$chameleon, {
        validators: json.validators,
        isInPreviewMode: false,
      });
    },
  };
</script>
