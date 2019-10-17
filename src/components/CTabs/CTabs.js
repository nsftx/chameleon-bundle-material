import {
  map, merge, some, isEmpty,
} from 'lodash';
import Element from '../Element';

const createTabItems = (context, createElement) => {
  const { elements } = context.config;
  return map(elements, (element, i) => createElement(
    context.getElementTag('tab-item'),
    {
      props: {
        definition: merge({}, element, {
          contentColor: context.config.contentColor,
        }),
        ordinal: i,
      },
    },
  ));
};

const getListeners = (context) => {
  const instance = context;
  const listeners = {
    change(value) {
      instance.activeTab = value;
      if (value) {
        const index = value.split('-')[1];
        const label = context.config.elements[index].title;
        context.sendToEventBus('SelectedItemChanged', {
          label,
        });
      }
    },
  };
  return listeners;
};

const getProperties = (context) => {
  const { config } = context;
  const props = {
    dark: context.isThemeDark,
    light: context.isThemeLight,
    centered: config.alignment === 'center',
    backgroundColor: config.headerColor,
    color: config.activeHeaderColor,
    iconsAndText: some(config.elements, element => !!element.icon),
    right: config.alignment === 'right',
    grow: config.grow,
    value: context.activeTab,
  };

  return props;
};


const getTabs = (context, createElement) => {
  const { config } = context;
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
        key: `tab-${i}`,
        props: {
          href: `#tab-${i}`,
        },
      },
      children,
    );
  });

  return tabs;
};

export default {
  extends: Element,
  data() {
    return {
      activeTab: 'tab-0',
    };
  },
  render(createElement) {
    const self = this;
    const data = {
      key: self.schema.uid,
      props: getProperties(self),
      on: getListeners(self),
    };

    const tabs = getTabs(self, createElement);
    const items = createTabItems(self, createElement);
    const { theme } = self.config;
    const children = [
      createElement('v-tabs-slider', {
        props: {
          color: self.config.sliderColor,
        },
      }),
      tabs,
      createElement('v-tabs-items', {
        props: {
          // Tabs (items) items should inherit theme from parent (tab)
          dark: !isEmpty(theme) ? theme === 'dark' : self.$parent.isDark,
          value: self.activeTab,
        },
      },
      items),
    ];

    return self.renderElement('v-tabs', data, children, true);
  },
};
