export default {
  group: 'containers',
  type: 'accordion',
  name: 'Accordion',
  icon: 'view_day',
  children: [
    'accordion-item',
  ],
  options: {
    alternativeDesign: {
      type: 'select',
      name: 'Alternative design',
      items: [
        {
          id: 1,
          name: 'Default',
          value: '',
        },
        {
          id: 2,
          name: 'Inset',
          value: 'inset',
        },
        {
          id: 3,
          name: 'Popout',
          value: 'popout',
        },
      ],
      returnObject: false,
      displayProp: 'name',
      valueProp: 'value',
      value: '',
      priority: 4,
    },
    itemsCount: {
      type: 'childrenCountInput',
      name: 'Item count',
      value: '1',
      validation: {
        required: true,
        min: 1,
      },
      priority: 1,
    },
    color: {
      type: 'input',
      name: 'Item header color',
      value: 'transparent',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 25,
      },
      priority: 2,
    },
    contentColor: {
      type: 'input',
      name: 'Item content color',
      value: 'transparent',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 25,
      },
      priority: 3,
    },
    multipleExpand: {
      type: 'check',
      name: 'Multiple expanded items',
      value: false,
      priority: 5,
    },
    contentRipple: {
      type: 'check',
      name: 'Ripple on item header',
      value: false,
      priority: 6,
    },
    hideItemActions: {
      type: 'check',
      name: 'Hide item actions',
      value: false,
      priority: 7,
    },
  },
};
