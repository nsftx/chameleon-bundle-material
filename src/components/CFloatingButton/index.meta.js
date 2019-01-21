import { binding } from '@utility';

export default {
  group: 'actions',
  type: 'floating-button',
  name: 'Floating Button',
  icon: 'control_point',
  optionGroups: {
    activator: {
      key: 'activator',
      name: 'Floating Button',
    },
  },
  children: [
    'floating-button-item',
  ],
  options: {
    color: true,
    theme: true,
    itemsCount: {
      type: 'childrenCountInput',
      name: 'Number of Child Elements',
      value: '0',
      validation: {
        required: true,
        min: 0,
      },
      priority: 3,
    },
    openOnHover: {
      type: 'check',
      name: 'Open On Hover',
      value: true,
      priority: 4,
    },
    absolute: {
      type: 'check',
      name: 'Position Relative To The Containing Element',
      value: false,
      priority: 5,
    },
    fixed: {
      type: 'check',
      name: 'Position Relative To The Viewport / Browser Window',
      value: false,
      priority: 6,
    },
    direction: {
      type: 'select',
      name: 'Direction In Which Content Will Be Shown',
      value: 'top',
      items: [
        {
          name: 'Left',
          value: 'left',
        },
        {
          name: 'Right',
          value: 'right',
        },
        {
          name: 'Bottom',
          value: 'bottom',
        },
        {
          name: 'Top',
          value: 'top',
        },
      ],
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= element.itemsCount == 0 %>'),
      },
      priority: 7,
    },
    align: {
      type: 'select',
      name: 'Alignment',
      value: 'bottom right',
      items: [
        {
          name: 'Bottom-Right',
          value: 'bottom right',
        },
        {
          name: 'Bottom-Left',
          value: 'bottom left',
        },
        {
          name: 'Top-Right',
          value: 'top right',
        },
        {
          name: 'Top-Left',
          value: 'top left',
        },
      ],
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !element.fixed && !element.absolute %>'),
      },
      priority: 9,
    },
    activator: {
      type: 'group',
      group: 'activator',
      icon: {
        type: 'iconSource',
        name: 'Icon Source',
        value: 'add_circle',
        priority: 1,
      },
      flat: {
        type: 'check',
        name: 'No Background',
        value: false,
        priority: 2,
      },
    },
  },
};
