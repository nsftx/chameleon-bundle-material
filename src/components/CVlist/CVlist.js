import _ from 'lodash';

require('../../style/components/_vlist.styl');

export default {
  name: 'c-vlist',
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
          'c-vlist--spaced': this.definition.gutter,
        },
        props: {
          color: this.definition.color,
          flat: this.definition.flat,
        },
        style: {
          backgroundColor: this.definition.color,
        },
        staticClass: 'c-vlist',
      },
      _.map(this.definition.elements, (element) => {
        const el = createElement(
          `c-${_.kebabCase(element.type)}`,
          {
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
