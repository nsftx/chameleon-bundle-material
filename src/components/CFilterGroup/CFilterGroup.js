import { map } from 'lodash';
import Element from '../Element';

export default {
  extends: Element,
  data() {
    return {
      entity: {},
    };
  },
  computed: {
    form() {
      const formName = this.config.name;
      return this.$refs[formName];
    },
  },
  methods: {
    apply() {
      this.entity = {};
      map(this.form.$children, (input) => {
        this.entity[input.name] = input.value;
      });
      this.sendToEventBus('Applied', this.entity);
    },
    clear() {
      this.form.reset();
      this.sendToEventBus('Cleared', this.entity);
    },
    getFields() {
      return this.config.elements;
    },
    getForm() {
      return this.$refs[this.config.name];
    },
    getFormInputs() {
      const self = this;
      return map(this.getFields(), field => self.$createElement(
        self.getElementTag(field.type),
        {
          props: {
            definition: field,
          },
          staticClass: `${self.$options.name}-items`,
          on: {
            input(value) {
              self.value = value;
              self.$emit('input', value);
              if (self.config.autoSubmit) self.apply();
            },
          },
        },
      ));
    },
    getFormComponent() {
      return this.$createElement('v-form',
        {
          ref: this.config.name,
          staticClass: `${this.$options.name} ${this.baseChildrenClass}`,
        },
        [
          this.getFormInputs(),
        ]);
    },
  },
  render() {
    const data = {
      props: {
        color: this.config.color,
        dark: this.isThemeDark,
        light: this.isThemeLight,
        flat: this.config.flat,
      },
    };

    return this.renderElement('v-card', data, this.getFormComponent(), true);
  },
};
