import _ from 'lodash';
import uuid from 'uuid/v4';
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
  const tabs = _.map(context.elements, (element, i) => {
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
        key: `tab${i}_${uuid}`,
      },
      children,
    );
  });

  return tabs;
};

export default {
  extends: Element,
  render(createElement) {
    const data = {
      key: this.schema.uid,
      props: getProps(this.definition),
    };

    const tabs = getTabs(this.definition, createElement);

    const items = _.map(this.definition.elements, element => createElement(
      this.getElementTag('tab-item'),
      {
        props: {
          definition: _.merge({},
            element,
            { contentColor: this.definition.contentColor }),
        },
      },
    ));

    const children = _.concat(tabs,
      createElement(
        'v-tabs-items',
        items,
      ),
    );

    return this.renderElement('v-tabs', data, children);
  },
};
