export default {
  group: 'container-items',
  type: 'tab-item',
  name: 'Tab Item',
  hidden: true,
  icon: 'tab',
  children: [
    '*',
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
  },
};
