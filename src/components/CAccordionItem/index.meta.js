export default {
  group: 'container-items',
  type: 'accordion-item',
  name: 'Accordion Item',
  hidden: true,
  icon: 'view_day',
  children: [
    '*',
    '!accordion-item',
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