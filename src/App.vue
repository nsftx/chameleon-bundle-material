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
              <v-card>
                <v-card-text>
                  <v-form ref="form"
                          v-if="form"
                          v-model="valid">
                    <div :key="field.name"
                         v-for="field in form.fields">
                      <c-control :definition="field"
                                 v-model="field.value">
                      </c-control>
                    </div>
                    <v-btn color="primary"
                           :disabled="!valid"
                           @click="save">
                      Save
                    </v-btn>
                  </v-form>
                </v-card-text>
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
  import CControl from './components/CControl/CControl';

  // This will come from Chameleon API
  const source = require('../static/data/form.json');

  export default {
    name: 'app',
    components: {
      CControl,
    },
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
          const form = container.forms.default;
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

        this.editor.set(source);
        this.setSource();
      },
      setSource() {
        this.source = this.editor.get();
      },
      save() {
        if (this.$refs.form.validate()) {
          this.$refs.form.getInputs().forEach((input) => {
            console.log(input.value);
          });
        }
      },
    },
    mounted() {
      this.createEditor();
    },
  };
</script>
