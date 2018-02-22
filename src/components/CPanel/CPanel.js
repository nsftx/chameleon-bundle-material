import _ from 'lodash';
import namespace from '@namespace';

export default {
  name: `${namespace}panel`,
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
        key: self.schema.uid,
        attrs: {
          'data-type': self.definition.type,
          'data-uid': self.schema.uid,
          'data-parent': self.schema.parent,
        },
        props: {
          color: self.definition.color,
          flat: self.definition.flat,
        },
        style: {
          backgroundColor: self.definition.color,
          width: self.definition.width,
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
