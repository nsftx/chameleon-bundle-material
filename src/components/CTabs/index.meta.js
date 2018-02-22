export default {
  group: 'containers',
  type: 'tabs',
  name: 'Tabs',
  icon: 'tab',
  children: [
    'tab-item',
  ],
  options: {
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
  },
};
