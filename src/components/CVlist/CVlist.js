import _ from 'lodash';
import namespace from '@namespace';

require('../../style/components/_vlist.styl');

export default {
  name: `${namespace}vlist`,
  props: {
    definition: {
      type: Object,
      required: true,
    },
    validators: {
      type: Object,
    },
  },
  render(createElement) {
    const self = this;

    return createElement(
      'v-card',
      {
        class: {
          [`${this.$options.name}--spaced`]: this.definition.gutter,
        },
        props: {
          color: this.definition.color,
          flat: this.definition.flat,
        },
        style: {
          backgroundColor: this.definition.color,
        },
        staticClass: this.$options.name,
      },
      _.map(this.definition.elements, (element) => {
        const el = createElement(
          `${namespace}${_.kebabCase(element.type)}`,
          {
            staticClass: `${this.$options.name}-item`,
            props: {
              definition: element,
              validators: self.validators,
            },
          },
        );

        return el;
      }),
    );
  },
};
