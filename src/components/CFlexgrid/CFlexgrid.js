import { map, merge } from 'lodash';
import uuid from 'uuid/v4';
import { elementable } from '@mixins';

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
  mixins: [
    elementable,
  ],
  render(createElement) {
    const items = map(this.definition.elements, element => createElement(
      this.getElementTag('flexgrid-item'),
      {
        key: `${element.name}_${uuid()}`,
        props: {
          definition: element,
        },
      },
    ));

    return createElement('v-container', {
      attrs: merge(
        getContainerAttrs(this.definition),
        this.getSchemaAttributes(),
      ),
      staticClass: `${this.baseClass} ${this.$options.name}`,
    },
      [
        createElement('v-layout', {
          attrs: getLayoutAttrs(this.definition),
        }, items),
      ]);
  },
};
