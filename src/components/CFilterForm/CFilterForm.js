import { kebabCase, map } from 'lodash';
import Element from '../Element';

const getComponentTag = (name, context) => {
  const tag = kebabCase(name);

  return `${context.$options.namespace}${tag}`;
};

const getFormInputs = context => map(context.getFields(), field => context.$createElement(
  getComponentTag(field.type, context),
  {
    props: {
      definition: field,
    },
    staticClass: `${context.$options.name}-items`,
    on: {
      input(value) {
        context.$emit('input', value);
        if (context.config.autoSubmit) {
          context.apply();
        }
      },
    },
  },
));

const getFormComponent = context => context.$createElement('v-form',
  {
    ref: context.config.name,
    staticClass: `${context.$options.name} ${context.baseChildrenClass}`,
  },
  [
    getFormInputs(context),
  ]);


export default {
  extends: Element,
  watch: {
    dataSource: {
      handler() {
        this.loadData();
      },
    },
  },
  // TODO
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
      return this.config.elements;
    },
    clear() {
      this.form.reset();
      this.sendToEventBus('Cleared', this.entity);
    },
    apply() {
      this.entity = {};
      map(this.form.$children, (input) => {
        this.entity[input.name] = input.value;
      });
      this.sendToEventBus('Applied', this.entity);
    },
  },
  render() {
    const context = this;
    const data = {
      props: {
        color: context.config.color,
        dark: context.isThemeDark,
        light: context.isThemeLight,
        flat: context.config.flat,
      },
    };

    return this.renderElement('v-card', data, getFormComponent(this), true);
  },
};
