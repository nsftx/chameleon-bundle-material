import { concat, each, filter, kebabCase, isArray, isNil, isObject, map, merge } from 'lodash';
import uuid from 'uuid/v4';
import { elementable } from '@mixins';

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

const getComponentTag = (name, context) => {
  const type = ['number', 'money'].indexOf(name) > -1 ? 'text' : name;
  const tag = kebabCase(type);

  return `${context.$options.namespace}${tag}`;
};

export default {
  mixins: [
    elementable,
  ],
  provide() {
    return {
      form: {
        fields: this.getFields(),
      },
    };
  },
  computed: {
    entity() {
      return this.getEntity();
    },
  },
  methods: {
    getActions() {
      return filter(this.definition.actions, n => !isNil(n.actions));
    },
    getForm() {
      return this.$refs[this.definition.name];
    },
    getFields() {
      return filter(this.definition.elements, n => isNil(n.actions));
    },
    getEntity() {
      const entity = {};
      each(this.getFields(), (field) => {
        if (field.name) {
          // Remove reactivity from output
          // TODO: Investigate if this has any benefit
          entity[field.name] = isObject(field.value)
            ? merge(isArray(field.value) ? [] : {}, field.value)
            : field.value;
        }
      });

      return entity;
    },
    getErrors() {
      let errors = [];
      each(this.getForm().getInputs(), (input) => {
        if (input.errorBucket.length) {
          errors = concat(errors, map(input.errorBucket, error => error));
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
        attrs: this.getSchemaAttributes(),
        props: {
          color: 'transparent',
          flat: true,
        },
        staticClass: `${this.baseClass} ${this.baseParentClass} ${this.$options.name}`,
      },
      [
        createElement(
          'v-form',
          {
            ref: this.definition.name,
            staticClass: this.$options.name,
          },
          [
            createElement(
              'v-card-text',
              {
                staticClass: `${context.baseChildrenClass} ${context.$options.name}-items`,
              },
              map(this.getFields(), (field) => {
                const self = this;
                return createElement(
                  getComponentTag(field.type, this),
                  {
                    props: {
                      definition: field,
                      validators: this.registry.validators,
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
                );
              }),
            ),
            createElement(
              'v-card-actions',
              map(this.getActions(), button => createElement(this.getElementTag('button'),
                {
                  // Dynamic key to disable component re-use
                  key: `${button.name}_${uuid()}`,
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
