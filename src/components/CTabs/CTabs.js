import { concat, map, merge, some } from 'lodash';
import Element from '../Element';

const createTabItems = (context, createElement) =>
  map(context.config.elements, element => createElement(
    context.getElementTag('tab-item'),
    {
      props: {
        definition: merge({}, element, {
          contentColor: context.config.contentColor,
        }),
      },
    },
  ));

const getListeners = (context) => {
  const listeners = {
    change(value) {
      if (value) {
        const label = context.config.elements[value].title;
        context.sendToEventBus('SelectedItemChanged', {
          label,
        });
      }
    },
  };
  return listeners;
};

const getProperties = (context) => {
  const config = context.config;
  const props = {
    dark: context.isThemeDark,
    light: context.isThemeLight,
    centered: config.alignment === 'center',
    color: config.headerColor,
    iconsAndText: some(config.elements, element => !!element.icon),
    right: config.alignment === 'right',
    sliderColor: config.sliderColor,
    grow: config.grow,
    value: 0,
  };

  return props;
};


const getTabs = (context, createElement) => {
  const config = context.config;
  const tabs = map(config.elements, (element, i) => {
    const children = [element.title];

    if (element.icon) {
      const iconEl = createElement(
        'v-icon',
        element.icon,
      );

      children.push(iconEl);
    }

    return createElement(
      'v-tab',
      {
        key: `tab${i}_${context.schema.uid}`,
      },
      children,
    );
  });

  return tabs;
};

export default {
  extends: Element,
  render(createElement) {
    const self = this;
    const data = {
      key: self.schema.uid,
      props: getProperties(self),
      on: getListeners(self),
    };

    const tabs = getTabs(self, createElement);
    const items = createTabItems(self, createElement);
    const children = concat(tabs,
      createElement(
        'v-tabs-items',
        {
          props: {
            dark: this.isThemeDark,
            light: this.isThemeLight,
          },
        },
        items,
      ),
    );

    return this.renderElement('v-tabs', data, children, true);
  },
};
