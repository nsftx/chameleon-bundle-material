import _ from 'lodash';

const getListeners = (context) => {
  const listeners = {};
  const formName = context.definition.name;

  // TODO: Listeners should be generated from definition
  // Listener handler should be generated from flow step
  listeners.save = () => {
    const form = context.$refs[formName];
    if (form.validate()) {
      console.log('Entity success =>', context.getEntity());
    } else {
      console.log('Entity error =>', context.getErrors());
    }
  };

  return listeners;
};

const getComponentTag = (name) => {
  const type = ['number', 'money'].indexOf(name) > -1 ? 'text' : name;
  const tag = _.kebabCase(type);

  return `c-${tag}`;
};

export default {
  name: 'c-form',
  provide() {
    return {
      form: {
        fields: this.definition.fields,
      },
    };
  },
  props: {
    definition: {
      type: Object,
      required: true,
    },
    validators: {
      type: Object,
    },
  },
  computed: {
    entity() {
      return this.getEntity();
    },
  },
  methods: {
    getForm() {
      return this.$refs[this.definition.name];
    },
    getEntity() {
      const entity = {};
      _.each(this.definition.fields, (field) => {
        if (field.name) {
          // Remove reactivity from output
          // TODO: Investigate if this has any benefit
          entity[field.name] = _.isObject(field.value)
            ? _.merge(_.isArray(field.value) ? [] : {}, field.value)
            : field.value;
        }
      });

      return entity;
    },
    getErrors() {
      let errors = [];
      _.each(this.getForm().getInputs(), (input) => {
        if (input.errorBucket.length) {
          errors = _.concat(errors, _.map(input.errorBucket, error => error));
        }
      });

      return errors;
    },
  },
  render(createElement) {
    const context = this;
    // TODO: Extract children render function
    // Arrow function madness ahead
    return createElement(
      'v-card',
      {
        props: {
          color: 'transparent',
          flat: true,
        },
      },
      [
        createElement(
          'v-form',
          {
            ref: this.definition.name,
            staticClass: 'c-form',
          },
          [
            createElement(
              'v-card-text',
              _.map(this.definition.fields, (field) => {
                const self = this;
                return createElement('div',
                  {
                    // Dynamic key to disable component re-use
                    key: `${field.name}_${Date.now()}`,
                  },
                  [
                    createElement(
                      getComponentTag(field.type),
                      {
                        props: {
                          definition: field,
                          validators: this.validators,
                        },
                        // TODO: Expand field listeners if needed
                        // Should fields be able to trigger flow?
                        on: {
                          input(value) {
                            const currentField = field;
                            currentField.value = value;
                            self.$emit('input', value);
                          },
                        },
                      },
                    ),
                  ]);
              }),
            ),
            createElement(
              'v-card-actions',
              _.map(this.definition.actions, button => createElement('c-button',
                {
                  // Dynamic key to disable component re-use
                  key: `${button.name}_${Date.now()}`,
                  props: {
                    definition: button,
                  },
                  on: getListeners(context),
                },
              )),
            ),
          ],
        ),
      ],
    );
  },
};
