import _ from 'lodash';
import uuid from 'uuid/v4';
import namespace from '@namespace';

const getAttrs = (context) => {
  const attrs = {
    fluid: context.fluid,
    [context.direction]: true,
    [context.spacing]: true,
  };

  return attrs;
};

export default {
  name: `${namespace}flexgrid`,
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

    const items = _.map(this.definition.elements, element => createElement(
      `${namespace}flexgrid-item`,
      {
        key: `${element.name}_${uuid()}`,
        props: {
          definition: element,
          validators: self.validators,
        },
      },
    ));

    return createElement(
      'v-container',
      {
        attrs: getAttrs(this.definition),
      },
      [
        createElement('v-layout', items),
      ],
    );
  },
};
