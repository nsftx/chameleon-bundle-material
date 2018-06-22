import { concat, each, filter, kebabCase, isArray, isNil, isObject, map, merge } from 'lodash';
import { v4 } from 'uuid';
import Element from '../Element';

const getComponentTag = (name, context) => {
  const type = ['number', 'money'].indexOf(name) > -1 ? 'text' : name;
  const tag = kebabCase(type);

  return `${context.$options.namespace}${tag}`;
};

const uuid = () => v4();

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
    save() {
      const formName = this.config.name;
      const form = this.$refs[formName];
      if (form.validate()) {
        this.sendToEventBus('Saved', this.getEntity());
      } else {
        this.sendToEventBus('Errored', this.getErrors());
      }
    },
  },
  render(createElement) {
    const context = this;

    const data = {
      props: {
        color: context.config.color,
        dark: context.isThemeDark,
        light: context.isThemeLight,
        flat: true,
      },
    };

    // TODO: Extract children render function
    // Arrow function madness ahead
    const children = createElement(
      'v-form',
      {
        ref: this.config.name,
        staticClass: `${this.$options.name} ${context.baseChildrenClass}`,
      },
      [
        createElement(
          'v-card-text',
          {
            staticClass: `${context.$options.name}-items`,
          },
          map(this.getFields(), (field) => {
            const self = this;
            return createElement(
              getComponentTag(field.type, this),
              {
                props: {
                  definition: field,
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
              on: {
                click() {
                  context.save();
                },
              },
            },
          )),
        ),
      ],
    );

    return this.renderElement('v-card', data, children, true);
  },
};
