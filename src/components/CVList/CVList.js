import _ from 'lodash';

require('../../stylus/components/_v-list.styl');

const getComponentTag = (name) => {
  const type = ['number', 'money'].indexOf(name) > -1 ? 'text' : name;
  const tag = _.kebabCase(type);

  return `c-${tag}`;
};

export default {
  name: 'c-v-list',
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
        props: {
          color: this.definition.color,
          flat: this.definition.flat,
        },
        style: {
          backgroundColor: this.definition.color,
        },
        staticClass: 'c-v-list',
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
