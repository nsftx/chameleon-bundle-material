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
              <template v-for="(container, index) in containers">
                <component :is="container"
                           :key="`container-${index}`"
                           class="mb-1"
                           :definition="getContainerDefinition(index)"
                           :validators="page.validators">
                </component>
              </template>
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
  const json = require('./page.json');

  export default {
    name: 'app',
    components: {
      VJsoneditor,
    },
    data() {
      return {
        source: json,
        validSource: null,
        page: null,
      };
    },
    computed: {
      containers() {
        if (!this.page) return [];

        return _.map(this.page.elements, (element) => {
          return getComponentTag(element.type);
        });
      }
    },
    methods: {
      getContainerDefinition(index) {
        return this.page.elements[index];
      },
      sourceChanged(value) {
        this.page = value;
        const validation = chameleonNotation.validate(this.page);

        if (!validation.isValid) {
          console.warn(validation.message);
        }

        this.validSource = this.page;
      },
    },
  };
</script>
