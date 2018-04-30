<template>
  <main>
    <v-app>
      <v-toolbar app
                 dark
                 fixed
                 clipped-left
                 color="green darken-2">
        <v-toolbar-side-icon @click.stop="toggleDrawer = !toggleDrawer"></v-toolbar-side-icon>
        <v-toolbar-title>Chameleon Playground</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-content>
        <v-navigation-drawer app
                             clipped
                             fixed
                             class="green"
                             v-if="navigation"
                             v-model="toggleDrawer"
                             dark>
          <v-list>
            <v-list-tile v-for="item in navigation.elements[0].dataSource.items"
                         :key="item.title"
                         @click="componentChanged(item.name)">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
        <v-container fluid>
          <v-layout row
                    wrap>
            <v-flex xs12>
              <v-card>
                <v-jsoneditor :value="source"
                              @input="sourceChanged">
                </v-jsoneditor>
              </v-card>
            </v-flex>
            <v-flex xs12
                    v-if="definition">
              <c-page :definition="definition"
                      :key="getUniqueKey(definition.elements[0].type)">
              </c-page>
            </v-flex>
          </v-layout>
          <v-footer app
                    height="80"
                    class="scroll-y"
                    id="scroll-target"
                    inset>
            <v-container style="max-height: 150px"
                         class="scroll-y"
                         id="scroll-target">
              <v-layout column
                        align-center
                        justify-center
                        v-scroll:#scroll-target>
                <span v-html="validationMessage">
                </span>
              </v-layout>
            </v-container>
          </v-footer>
        </v-container>
      </v-content>
    </v-app>
  </main>
</template>

<script>
  import { v4 } from 'uuid';
  import axios from 'axios';
  import { assign, merge } from 'lodash';
  import VJsoneditor from 'vue-jsoneditor';
  import chameleonNotation from '@nsoft/chameleon-notation';
  import connectorApi from '@nsoft/chameleon-sdk/src/api/connector';

  const navigation = require('./data/navigation.json');
  const defaultJson = require('./data/page.json');

  const http = axios.create({
    timeout: 5000,
  });

  const uuid = () => v4();

  export default {
    name: 'app',
    components: {
      VJsoneditor,
    },
    data() {
      return {
        toggleDrawer: true,
        validation: null,
        validators: null,
        definition: null,
        source: null,
        navigation,
        uuid,
      };
    },
    computed: {
      validationMessage() {
        return this.validation && this.validation.message ?
          this.validation.message.replace(/(?:\r\n|\r|\n)/g, '<br />') : '';
      },
    },
    methods: {
      getUniqueKey(type) {
        return `${type}_${uuid()}`;
      },
      componentChanged(component) {
        const self = this;
        http.get(`/data/${component}.json`).then((response) => {
          self.source = response.data.pages ? response.data.pages[0] : response.data;
          self.definition = self.source;
          self.validateNotation();
        });
      },
      sourceChanged(value) {
        this.definition = value;
        this.validateNotation();
      },
      validateNotation() {
        this.validation = chameleonNotation.validate(this.definition);
      },
    },
    mounted() {
      assign(this.$chameleon, {
        connector: connectorApi,
        connectors: defaultJson.connectors,
        validators: defaultJson.validators,
      });

      this.definition = defaultJson.pages[0];
      this.source = defaultJson.pages[0];
    },
  };
</script>
