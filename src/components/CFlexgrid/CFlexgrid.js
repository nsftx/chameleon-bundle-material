import { map } from 'lodash';
import uuid from 'uuid/v4';
import Element from '../Element';

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
  extends: Element,
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

    const data = {
      attrs: getContainerAttrs(this.definition),
    };

    const children = createElement('v-layout',
      {
        attrs: getLayoutAttrs(this.definition),
      }, items);

    return this.renderElement('v-container', data, children);
  },
};
