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
                     grid-list-lg>
          <v-layout row
                    wrap>
            <v-flex xs12
                    md6>
              <v-card>
                <v-card-text>
                  <div id="jsoneditor"></div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary"
                         @click="setSource">
                    Render
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12
                    md6>
              <v-card v-if="form">
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
  const page = require('./page.json');

  export default {
    name: 'app',
    data() {
      return {
        source: null,
        editor: null,
        valid: false,
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
      createEditor() {
        const container = document.getElementById('jsoneditor');

        this.editor = new JSONEditor(container, {
          mode: 'tree',
        });

        this.editor.set(page);
        this.setSource();
      },
      setSource() {
        this.source = this.editor.get();
      },
    },
    mounted() {
      this.createEditor();
    },
  };
</script>
