import _ from 'lodash';
import uuid from 'uuid/v4';
import { elementable } from '@mixins';

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
  mixins: [
    elementable,
  ],
  render(createElement) {
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

    return createElement(
      'v-tabs',
      {
        key: this.schema.uid,
        attrs: this.getSchemaAttributes(),
        props: getProps(this.definition),
        staticClass: `${this.baseClass} ${this.$options.name}`,
      },
      _.concat(tabs, createElement(
        'v-tabs-items',
        items,
      )),
    );
  },
};
