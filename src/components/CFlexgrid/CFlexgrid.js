import { map } from 'lodash';
import { v4 } from 'uuid';
import Element from '../Element';

const getContainerAttrs = (context) => {
  const attrs = {
    fluid: context.fluid,
    [`grid-list-${context.spacing}`]: true,
    wrap: true,
    container: true,
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

const uuid = () => v4();

export default {
  extends: Element,
  render(createElement) {
    const items = map(this.config.elements, element => createElement(
      this.getElementTag('flexgrid-item'),
      {
        key: `${element.name}_${uuid()}`,
        props: {
          definition: element,
        },
      },
    ));

    const data = {
      class: getContainerAttrs(this.config),
    };

    const children = createElement('v-layout',
      {
        attrs: getLayoutAttrs(this.config),
      }, items);

    return this.renderElement('div', data, children);
  },
};
