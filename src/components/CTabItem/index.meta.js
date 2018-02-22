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
      name: 'Item count',
      value: 'Item title',
      validation: {
        required: true,
        minLength: 2,
      },
      priority: 1,
    },
    text: {
      type: 'input',
      name: 'Item text',
      value: 'Long live the Chameleon!',
      validation: {
        minLength: 5,
      },
      priority: 2,
    },
  },
};
