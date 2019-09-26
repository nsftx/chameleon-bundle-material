
import { isUndefined, map, merge } from 'lodash';
import Element from '../Element';

const getProps = (context) => {
  const { config } = context;
  const position = config.align.split(' ');
  const relative = !config.absolute && !config.fixed;

  const props = {
    openOnHover: config.openOnHover,
    absolute: config.absolute,
    direction: config.direction,
    fixed: config.fixed,
    [position[0]]: !relative,
    [position[1]]: !relative,
    value: true,
  };

  return props;
};


const getChildSlot = (createElement, context) => {
  const { config } = context;
  let children = [];

  if (config.elements.length) {
    children = map(config.elements, data => createElement(context.getElementTag('floating-button-item'),
      {
        props: {
          definition: merge({ displayAsIcon: true }, data),
        },
      }));
  }

  /* Activator slot, can be used as single floating button
    removed c-element class from button */
  children.unshift(createElement('c-button',
    {
      props: {
        unselectable: true,
        definition: merge({
          displayAsIcon: true,
          color: config.color || 'primary',
          text: isUndefined(config.text) ? false : config.text,
          theme: config.theme,
        }, config.activator),
      },
      slot: 'activator',
    }));

  return children;
};

export default {
  extends: Element,
  render(createElement) {
    const data = {
      props: getProps(this),
      staticStyle: {
        display: 'inline-block',
      },
    };

    const children = getChildSlot(createElement, this);

    return this.renderElement('v-speed-dial', data, children);
  },
};
