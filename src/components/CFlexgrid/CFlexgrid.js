import { map } from 'lodash';
import uuid from 'uuid/v4';
import namespace from '@namespace';

const getContainerAttrs = (context) => {
  const attrs = {
    fluid: context.fluid,
    [`grid-list-${context.spacing}`]: true,
    wrap: true,
  };

  return attrs;
};

const getLayoutAttrs = (context) => {
  const attrs = {
    [context.direction]: true,
    wrap: true,
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
    const items = map(this.definition.elements, element => createElement(
      `${namespace}flexgrid-item`,
      {
        key: `${element.name}_${uuid()}`,
        props: {
          definition: element,
        },
      },
    ));

    return createElement(
      'v-container',
      {
        attrs: getContainerAttrs(this.definition),
      },
      [
        createElement('v-layout',
          {
            attrs: getLayoutAttrs(this.definition),
          },
          items),
      ],
    );
  },
};
