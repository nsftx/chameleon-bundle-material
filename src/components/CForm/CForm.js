import { concat, each, filter, kebabCase, isArray, isNil, isObject, map, merge } from 'lodash';
import { v4 } from 'uuid';
import Element from '../Element';

const getComponentTag = (name, context) => {
  const type = ['number', 'money'].indexOf(name) > -1 ? 'text' : name;
  const tag = kebabCase(type);

  return `${context.$options.namespace}${tag}`;
};

const uuid = () => v4();

const getFormActions = (context, createElement) => {
  if (!context.formActionsStatus) return false;

  return createElement(
    'v-card-actions',
    map(context.formActions, (button, action) => createElement(
      getComponentTag('button', context),
      {
        props: {
          definition: button,
        },
        key: `${button.name}_${uuid()}`,
        on: {
          click() {
            context[action]();
          },
        },
      })),
  );
};

const getFormInputs = (context, createElement) => createElement(
  'v-card-text',
  {
    staticClass: `${context.$options.name}-items`,
  },
  map(context.getFields(), field => createElement(
    getComponentTag(field.type, context),
    {
      props: {
        definition: field,
      },
      on: {
        input(value) {
          const currentField = field;
          currentField.value = value;
          context.$emit('input', value);
        },
      },
    },
  )),
);

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
    formActions() {
      return {
        save: this.config.save,
        clear: this.config.clear,
      };
    },
    formActionsStatus() {
      return this.config.enabled;
    },
    entity() {
      return this.getEntity();
    },
  },
  methods: {
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
      // TODO fix for validation in new beta-3 vuetify
      each(this.getForm().inputs, (input) => {
        if (input.errorBucket.length) {
          errors = concat(errors, map(input.errorBucket, error => error));
        }
      });

      return errors;
    },
    clear() {
      console.log('Clear actions TODO');
    },
    save() {
      const formName = this.config.name;
      const form = this.$refs[formName];
      console.log('TODO SAVE form ', form);
      /* if (form.validate()) {
        this.sendToEventBus('Saved', this.getEntity());
      } else {
        this.sendToEventBus('Errored', this.getErrors());
      } */
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

    const children = createElement(
      'v-form',
      {
        ref: this.config.name,
        staticClass: `${this.$options.name} ${context.baseChildrenClass}`,
      },
      [
        getFormInputs(this, createElement),
        getFormActions(this, createElement),
      ],
    );

    return this.renderElement('v-card', data, children, true);
  },
};
