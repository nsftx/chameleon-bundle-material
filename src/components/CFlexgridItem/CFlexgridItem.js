import { map, merge, kebabCase } from 'lodash';
import uuid from 'uuid/v4';
import namespace from '@namespace';
import { elementable } from '@mixins';

const getItemContent = (context, createElement) => {
  const element = context.definition;
  const children = map(element.elements, (childElement) => {
    const childEl = createElement(
      `${namespace}${kebabCase(childElement.type)}`,
      {
        key: `${childElement.name}_${uuid()}`,
        props: {
          definition: childElement,
        },
      },
    );

    return childEl;
  });

  return children;
};

export default {
  name: `${namespace}flexgrid-item`,
  mixins: [
    elementable,
  ],
  render(createElement) {
    return createElement('v-flex', {
      attrs: merge({
        [`xs${this.definition.width}`]: true,
      }, this.getSchemaAttributes()),
      staticClass: `${this.baseClass} ${this.$options.name}`,
    },
      [
        getItemContent(this, createElement),
      ]);
  },
};
