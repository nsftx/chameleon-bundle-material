import { map, kebabCase } from 'lodash';
import uuid from 'uuid/v4';
import namespace from '@namespace';

const getItemContent = (element, createElement) => {
  const children = map(element.elements, (childElement) => {
    const childEl = createElement(
      `${namespace}${kebabCase(childElement.type)}`,
      {
        key: `${childElement.name}_${uuid()}`,
        props: {
          definition: childElement,
          validators: self.validators,
        },
      },
    );

    return childEl;
  });

  return children;
};

export default {
  name: `${namespace}flexgrid-item`,
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
    return createElement('v-flex',
      {
        attrs: {
          [`xs${this.definition.width}`]: true,
        },
      },
      [
        getItemContent(this.definition, createElement),
      ]);
  },
};
