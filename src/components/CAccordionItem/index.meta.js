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
      name: 'Item title',
      value: 'Item title',
      validation: {
        minLength: 2,
      },
      priority: 1,
    },
  },
};
