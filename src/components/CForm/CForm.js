import {
  filter,
  kebabCase,
  isNil,
  merge,
  map,
} from 'lodash';
import { v4 } from 'uuid';
import Element from '../Element';

const getComponentTag = (name, context) => {
  const tag = kebabCase(name);

  return `${context.$options.namespace}${tag}`;
};

const uuid = () => v4();

const getFormActions = (context, createElement) => createElement(
  'v-card-actions',
  map(context.formActions, (button, action) => createElement(
    getComponentTag('button', context),
    {
      props: {
        unselectable: true,
        definition: merge({}, button),
      },
      attrs: {
        action: true,
      },
      key: `${button.name}_${uuid()}`,
      on: {
        click() {
          context[action]();
        },
      },
    },
  )),
);

const getFormInputs = (context, createElement) => map(context.getFields(),
  field => createElement(
    getComponentTag(field.type, context),
    {
      props: {
        definition: field,
      },
      staticClass: `${context.$options.name}-items`,
      on: {
        input(value) {
          const currentField = field;
          currentField.value = value;
          context.$emit('input', value);
        },
      },
    },
  ));

const getFormComponent = (context, createElement) => createElement('v-form',
  {
    ref: context.config.name,
    staticClass: `${context.$options.name} ${context.baseChildrenClass}`,
  },
  [
    getFormInputs(context, createElement),
  ]);


export default {
  extends: Element,
  provide() {
    return {
      cEntity: {
        fields: () => this.getFields(),
      },
    };
  },
  data() {
    return {
      entity: {},
      errors: [],
    };
  },
  computed: {
    formActions() {
      return {
        submit: this.config.submit,
        clear: this.config.clear,
      };
    },
    form() {
      const formName = this.config.name;
      return this.$refs[formName];
    },
  },
  methods: {
    getForm() {
      return this.$refs[this.config.name];
    },
    getFields() {
      return filter(this.config.elements, n => isNil(n.actions));
    },
    validateForm() {
      this.getForm().validate();
      let valid = true;
      map(this.getForm().$children, (input) => {
        // We need to remove submit & clear from validation
        if (!input.$attrs.action) {
          if (!input.validate()) {
            this.errors.push(input.errorBucket);
            valid = false;
          } else {
            this.entity[input.name] = input.value;
          }
        }
      });

      return valid;
    },
    clear() {
      this.form.reset();
      this.sendToEventBus('Cleared', {});
    },
    saveData(data) {
      this.saveConnectorData(data);
    },
    submit() {
      this.errors = [];
      this.entity = {};
      if (this.validateForm()) {
        this.sendToEventBus('Submitted', this.entity);
      } else {
        this.sendToEventBus('Errored', this.errors);
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

    const children = [
      getFormComponent(this, createElement),
      getFormActions(this, createElement),
    ];

    return this.renderElement('v-card', data, children, true);
  },
};
