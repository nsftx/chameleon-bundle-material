import _ from 'lodash';
import uuid from 'uuid/v4';

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
          `c-${_.kebabCase(element.type)}`,
          {
            key: `${element.name}_${uuid()}`,
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
