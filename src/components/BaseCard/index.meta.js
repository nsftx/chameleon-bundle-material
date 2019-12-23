export default {
  events: [
    {
      name: 'Selected',
    },
  ],
  group: 'widgets',
  type: 'ct-card',
  name: 'Card',
  icon: 'inbox',
  children: [
    '*',
    '!inputs',
    '!container-items',
  ],
  options: {
    color: {
      group: 'style',
      priority: 1,
    },
    theme: {
      group: 'style',
      priority: 2,
    },
    flat: {
      type: 'check',
      name: 'No Background Shadow',
      group: 'style',
      value: true,
      priority: 3,
    },
  },
};
