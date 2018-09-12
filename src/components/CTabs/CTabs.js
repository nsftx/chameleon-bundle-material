import _ from 'lodash';
import Element from '../Element';

const getProps = (context) => {
  const props = {
    centered: context.alignment === 'center',
    color: context.headerColor,
    grow: context.fillSpace,
    iconsAndText: _.some(context.elements, element => !!element.icon),
    right: context.alignment === 'right',
    sliderColor: context.sliderColor,
  };

  return props;
};


const getTabs = (context, createElement) => {
  const config = context.config;
  const tabs = _.map(config.elements, (element, i) => {
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
      props: getProps(self.config),
      on: {
        input(value) {
          const label = self.config.elements[value].title;
          self.sendToEventBus('SelectedItemChanged', {
            label,
          });
        },
      },
    };

    const tabs = getTabs(self, createElement);

    const items = _.map(self.config.elements, element => createElement(
      self.getElementTag('tab-item'),
      {
        props: {
          definition: _.merge({},
            element,
            { contentColor: self.config.contentColor }),
        },
      },
    ));

    const children = _.concat(tabs,
      createElement(
        'v-tabs-items',
        items,
      ),
    );

    return this.renderElement('v-tabs', data, children, true);
  },
};
