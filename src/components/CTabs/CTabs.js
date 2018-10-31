import { concat, map, merge, some } from 'lodash';
import Element from '../Element';

const getProps = (context) => {
  const config = context.config;
  const props = {
    centered: config.alignment === 'center',
    color: config.headerColor,
    grow: config.fillSpace,
    iconsAndText: some(config.elements, element => !!element.icon),
    right: config.alignment === 'right',
    sliderColor: config.sliderColor,
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
      props: getProps(self),
      on: {
        change(value) {
          if (value) {
            const label = self.config.elements[value].title;
            self.sendToEventBus('SelectedItemChanged', {
              label,
            });
          }
        },
      },
    };

    const tabs = getTabs(self, createElement);

    const items = map(self.config.elements, element => createElement(
      self.getElementTag('tab-item'),
      {
        props: {
          definition: merge({},
            element,
            { contentColor: self.config.contentColor }),
        },
      },
    ));

    const children = concat(tabs,
      createElement(
        'v-tabs-items',
        items,
      ),
    );

    return this.renderElement('v-tabs', data, children, true);
  },
};
