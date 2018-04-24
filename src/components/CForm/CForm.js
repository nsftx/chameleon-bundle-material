import { concat, each, filter, kebabCase, isArray, isNil, isObject, map, merge } from 'lodash';
import uuid from 'uuid/v4';
import Element from '../Element';

const getListeners = (context) => {
  const listeners = {};
  const formName = context.config.name;

  // TODO: Listeners should be generated from config
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
  extends: Element,
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
      return filter(this.config.actions, n => !isNil(n.actions));
    },
    getForm() {
      return this.$refs[this.config.name];
    },
    getFields() {
      return filter(this.config.elements, n => isNil(n.actions));
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

    const data = {
      props: {
        color: 'transparent',
        flat: true,
      },
    };

    // TODO: Extract children render function
    // Arrow function madness ahead
    const children = createElement(
      'v-form',
      {
        ref: this.config.name,
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
    );

    return this.renderElement('v-card', data, children);
  },
};
