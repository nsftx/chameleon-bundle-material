import { map } from 'lodash';
import Element from '../Element';

const getContainerAttrs = (context) => {
  const config = context.config;
  const attrs = {
    [config.color]: true,
    fluid: config.fluid,
    [`grid-list-${config.spacing}`]: true,
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


export default {
  extends: Element,
  render(createElement) {
    const items = map(this.config.elements, element => createElement(
      this.getElementTag('flexgrid-item'),
      {
        props: {
          definition: element,
        },
      },
    ));

    const data = {
      key: this.schema.uid,
      class: getContainerAttrs(this),
      props: {
        dark: this.isThemeDark,
        light: this.isThemeLight,
        flat: this.config.flat,
      },
    };

    const children = createElement('v-layout',
      {
        attrs: getLayoutAttrs(this.config),
      }, items);

    return this.renderElement(
      'v-card',
      data,
      children,
      true,
    );
  },
};
