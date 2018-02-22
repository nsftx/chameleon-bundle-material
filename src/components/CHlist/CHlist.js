import _ from 'lodash';
import namespace from '@namespace';

require('../../style/components/_hlist.styl');

export default {
  name: `${namespace}hlist`,
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
    schema() {
      return this.definition._schema || {};
    },
  },
  render(createElement) {
    const self = this;

    const renderChildren = () => {
      const children = self.definition.elements;
      return _.map(children, (child) => {
        const el = createElement(
          `${namespace}${_.kebabCase(child.type)}`,
          {
            staticClass: `${self.$options.name}-item`,
            props: {
              definition: child,
              validators: self.validators,
            },
          },
        );

        return el;
      });
    };

    return createElement(
      'v-card',
      {
        attrs: {
          'data-type': self.definition.type,
          'data-uid': self.schema.uid,
          'data-parent': self.schema.parent,
        },
        class: {
          [`${self.$options.name}--spaced`]: self.definition.gutter,
        },
        props: {
          color: self.definition.color,
          flat: self.definition.flat,
        },
        style: {
          backgroundColor: self.definition.color,
        },
        staticClass: `${namespace}element ${self.$options.name}`,
      },
      [
        createElement('div', {
          staticClass: `${namespace}element-children ${self.$options.name}-items`,
        }, renderChildren()),
      ],
    );
  },
};
