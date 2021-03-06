import { map } from 'lodash';
import Element from '../Element';

const getContainerClass = (context) => {
  const { config } = context;
  const classes = {
    [config.color]: true,
    'container--fluid': config.fluid,
    [`grid-list-${config.spacing}`]: true,
    wrap: true,
    container: true,
  };

  return classes;
};

const getLayoutAttrs = (context) => {
  const attrs = {
    [context.direction]: true,
    wrap: context.direction !== 'column',
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
      class: getContainerClass(this),
      props: {
        dark: this.isThemeDark,
        light: this.isThemeLight,
        flat: this.config.flat,
      },
      style: {
        overflow: 'hidden',
        height: this.config.height,
      },
    };

    const children = createElement('v-layout',
      {
        attrs: getLayoutAttrs(this.config),
        class: 'fill-height',
      }, items);

    return this.renderElement(
      'v-card',
      data,
      children,
      true,
    );
  },
};
