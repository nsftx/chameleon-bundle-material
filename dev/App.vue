<template>
  <main>
    <v-app>
      <v-toolbar app
                 dark
                 fixed
                 color="primary">
        <v-toolbar-side-icon @click.stop="toggleDrawer = !toggleDrawer"></v-toolbar-side-icon>
        <v-toolbar-title>Chameleon Playground</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-content>
        <v-container fluid
                     v-if="navigation">
          <v-navigation-drawer app
                               class="blue"
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
        </v-container>
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
                      :validators="validators"
                      :key="getUniqueKey(definition.type)">
              </c-page>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer app></v-footer>
    </v-app>
  </main>
</template>

<script>
  import uuid from 'uuid';
  import axios from 'axios';
  import { assign } from 'lodash';
  import VJsoneditor from 'vue-jsoneditor';
  import chameleonNotation from 'chameleon-notation';

  const navigation = require('./data/navigation.json');
  const defaultJson = require('./data/page.json');

  export default {
    name: 'app',
    components: {
      VJsoneditor,
    },
    data() {
      return {
        validators: defaultJson.validators,
        definition: defaultJson.pages[0],
        source: defaultJson.pages[0],
        toggleDrawer: true,
        app: null,
        navigation,
        uuid,
      };
    },
    methods: {
      getUniqueKey(type) {
        return `${type}_${uuid()}`;
      },
      sourceChanged(value) {
        this.app = value;
        this.definition = value;
        this.notationValidate(this.app);
      },
      componentChanged(component) {
        const self = this;
        const http = axios.create({
          baseURL: process.env.baseUrl,
        });

        http.get(`/data/${component}.json`).then((response) => {
          self.source = response.data.pages ? response.data.pages[0] : response.data;
          self.definition = self.source;
          self.notationValidate(self.source);
        });
      },
      notationValidate() {
        const validation = chameleonNotation.validate(this.app);

        if (!validation.isValid) {
          console.warn(validation.message);
        }
      },
    },
    mounted() {
      assign(this.$chameleon, {
        validators: defaultJson.validators,
      });
    },
  };
</script>
