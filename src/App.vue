<template>
  <v-app>
    <v-navigation-drawer v-model="toggleDrawer"
                         :clipped="$vuetify.breakpoint.lgAndUp"
                         app
                         class="primary">
      <v-list dark
              class="primary">
        <v-list-item v-for="item in navigation.elements[0].dataSource.items"
                     :key="item.title"
                     class="primary"
                     @click="componentChanged(item.name)">
          <v-list-item-action>
            <v-icon class="primary">
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp"
               app
               fixed
               dark
               color="primary">
      <v-app-bar-nav-icon light
                          @click.stop="toggleDrawer = !toggleDrawer" />
      <v-toolbar-title>Chameleon Playground</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container fluid
                   class="fill-height">
        <v-row class="fill-height">
          <v-col cols="12">
            <v-card>
              <v-jsoneditor :value="source"
                            @input="sourceChanged" />
            </v-card>
          </v-col>
          <v-col v-if="definition"
                 class="fill-height"
                 cols="12">
            <c-page :key="getUniqueKey(definition.elements[0].type)"
                    :definition="definition" />
          </v-col>
        </v-row>
        <v-footer id="scroll-target"
                  app
                  height="80"
                  class="overflow-y-auto"
                  inset>
          <v-container id="scroll-target"
                       style="max-height: 150px"
                       class="overflow-y-auto">
            <v-row v-scroll:#scroll-target
                   align="center"
                   justify="center">
              <c-text :definition="validationMessage" />
            </v-row>
          </v-container>
        </v-footer>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { v4 } from 'uuid';
import axios from 'axios';
import { assign } from 'lodash';
import VJsoneditor from 'vue-jsoneditor';
import chameleonNotation from '@nsoft/chameleon-notation';
import connectorApi from '@nsoft/chameleon-sdk/src/api/connector';

const navigation = require('../public/data/navigation.json');
const defaultJson = require('../public/data/page.json');

const http = axios.create({
  timeout: 5000,
});

const uuid = () => v4();

export default {
  name: 'App',
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
      const definition = {
        text: this.validation && this.validation.message
          ? [this.validation.message.replace(/(?:\r\n|\r|\n)/g, '<br />')] : '',
      };
      return definition;
    },
  },
  mounted() {
    assign(this.$chameleon, {
      connector: connectorApi,
      connectors: defaultJson.connectors,
    });

    [this.definition] = defaultJson.pages;
    [this.source] = defaultJson.pages;
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
};
</script>
