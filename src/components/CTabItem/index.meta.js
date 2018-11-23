export default {
  group: 'container-items',
  type: 'tab-item',
  name: 'Tab Item',
  hidden: true,
  icon: 'tab',
  children: [
    '*',
    '!inputs',
    '!container-items',
  ],
  options: {
    title: {
      type: 'input',
      name: 'Item Title',
      value: 'Item title',
      validation: {
        minLength: 2,
      },
      priority: 1,
    },
    icon: {
      type: 'iconSource',
      name: 'Icon Source',
      value: null,
      priority: 2,
    },
  },
};
