import _ from 'lodash';

require('../../stylus/components/_hlist.styl');

const getComponentTag = (name) => {
  const type = ['number', 'money'].indexOf(name) > -1 ? 'text' : name;
  const tag = _.kebabCase(type);

  return `c-${tag}`;
};

export default {
  name: 'c-hlist',
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
          'c-hlist--spaced': this.definition.gutter,
        },
        props: {
          color: this.definition.color,
          flat: this.definition.flat,
        },
        style: {
          backgroundColor: this.definition.color,
        },
        staticClass: 'c-hlist',
      },
      _.map(this.definition.elements, (element) => {
        const el = createElement(
          getComponentTag(element.type),
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
