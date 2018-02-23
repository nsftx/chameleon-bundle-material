import _ from 'lodash';
import uuid from 'uuid/v4';
import namespace from '@namespace';

const getTabItemContent = (context, createElement) => {
  const definition = context.definition;
  return _.map(definition.elements, (childElement) => {
    const childEl = createElement(
      `${namespace}${_.kebabCase(childElement.type)}`,
      {
        key: `${childElement.name}_${uuid()}`,
        props: {
          definition: childElement,
        },
      },
    );

    return childEl;
  });
};

export default {
  name: `${namespace}tab-item`,
  props: {
    definition: {
      type: Object,
      required: true,
    },
  },
  render(createElement) {
    return createElement(
      'v-tab-item',
      getTabItemContent(this, createElement),
    );
  },
};
