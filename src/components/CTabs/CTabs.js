import _ from 'lodash';
import uuid from 'uuid/v4';
import namespace from '@namespace';

const getProps = (context) => {
  const props = {
    color: context.headerColor,
    iconsAndText: _.some(context.elements, element => !!element.icon),
    sliderColor: context.sliderColor,
  };

  return { props };
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
  name: `${namespace}tabs`,
  props: {
    definition: {
      type: Object,
      required: true,
    },
    validators: {
      type: Object,
    },
  },
  render(createElement) {
    const self = this;
    const tabs = getTabs(this.definition, createElement);

    const items = _.map(this.definition.elements, element => createElement(
      `${namespace}tab-item`,
      {
        key: `${element.title}_${uuid}`,
        props: {
          definition: element,
          validators: self.validators,
        },
      },
    ));

    return createElement(
      'v-tabs',
      getProps(this.definition),
      _.concat(tabs, createElement(
        'v-tabs-items',
        items,
      )),
    );
  },
};
