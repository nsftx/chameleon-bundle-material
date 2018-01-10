import _ from 'lodash';

const getComponentTag = (name) => {
  const type = ['number', 'money'].indexOf(name) > -1 ? 'text' : name;
  const tag = _.kebabCase(type);

  return `c-${tag}`;
};

export default {
  name: 'c-panel',
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
          width: this.definition.width,
        },
        staticClass: 'c-panel',
      },
      _.map(this.definition.elements, (element) => {
        const el = createElement(
          getComponentTag(element.type),
          {
            key: `${element.name}_${Date.now()}`,
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
