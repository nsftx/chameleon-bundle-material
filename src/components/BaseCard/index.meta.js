export default {
  group: 'widgets',
  type: 'card',
  name: 'Card',
  icon: 'inbox',
  events: [
    {
      name: 'Selected',
    },
  ],
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
    outlined: {
      type: 'check',
      name: 'Enable Card Border',
      group: 'style',
      value: false,
      priority: 4,
    },
  },
};
