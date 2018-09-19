
import { map, merge } from 'lodash';
import Element from '../Element';

require('../../style/components/_floating-button.styl');

const getProps = (context) => {
  const config = context.config;
  const position = config.align.split(' ');
  const relative = !config.absolute && !config.fixed;

  const props = {
    openOnHover: config.openOnHover,
    absolute: config.absolute,
    direction: config.direction,
    fixed: config.fixed,
    [position[0]]: !relative,
    [position[1]]: !relative,
    align: config.align,
    value: false,
  };

  return props;
};


const getChildSlot = (createElement, context) => {
  const config = context.config;
  let children = [];

  if (config.elements.length) {
    children = map(config.elements, data =>
      createElement(context.getElementTag('floating-button-item'),
        {
          props: {
            definition: merge({}, data),
          },
        }));
  }

  /* Activator slot, can be used as single floating button
    removed c-element class from button */
  children.unshift(createElement('c-button',
    {
      props: {
        definition: merge({
          notSelectable: true,
          color: config.color || 'primary',
          theme: config.theme,
        }, config.activator),
      },
      slot: 'activator',
    }, null, false, true));

  return children;
};

export default {
  extends: Element,
  render(createElement) {
    const data = {
      props: getProps(this),
    };

    const children = getChildSlot(createElement, this);

    return this.renderElement('v-speed-dial', data, children);
  },
};
