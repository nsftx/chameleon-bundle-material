import { map } from 'lodash';
import Element from '../Element';

require('../../style/components/_filter-group.styl');

export default {
  extends: Element,
  data() {
    return {
      entity: {},
    };
  },
  computed: {
    filterGroup() {
      const filterName = this.config.name;
      return this.$refs[filterName];
    },
  },
  methods: {
    apply() {
      this.entity = {};
      map(this.filterGroup.$children, (input) => {
        this.entity[input.name] = input.value;
      });
      this.sendToEventBus('Applied', this.entity);
    },
    clear() {
      this.filterGroup.reset();
      this.sendToEventBus('Cleared', this.entity);
    },
    getFields() {
      return this.config.elements;
    },
    getFilterContent() {
      return this.$createElement('v-container', {
        attrs: {
          [`grid-list-${this.config.elementSpacing}`]: true,
        },
        class: this.config.spacing ? 'pa-0' : '',
      },
      [
        this.$createElement('v-layout', {
          attrs: {
            [this.config.direction]: true,
            wrap: this.config.direction !== 'column',
          },
          class: 'fill-height',
        },
        [
          this.getFilterInputs(),
        ]),
      ]);
    },
    getFilterInputs() {
      const self = this;
      return map(this.getFields(), field => self.$createElement('v-flex', {}, [
        self.$createElement(self.getElementTag(field.type),
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
          }),
      ]));
    },
    getFilterComponent() {
      return this.$createElement('v-form',
        {
          ref: this.config.name,
          staticClass: `${this.$options.name} ${this.baseChildrenClass}`,
        },
        [
          this.getFilterContent(),
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

    return this.renderElement('v-card', data, this.getFilterComponent(), true);
  },
};
