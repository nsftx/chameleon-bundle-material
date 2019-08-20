export default {
  group: 'containers',
  type: 'hlist',
  name: 'Horizontal List',
  icon: 'view_week',
  children: [
    '*',
    '!inputs',
    '!container-items',
  ],
  options: {
    color: true,
    flat: {
      type: 'check',
      name: 'No Shadow',
      value: false,
      priority: 2,
    },
    spaced: {
      type: 'check',
      name: 'Spacing',
      value: false,
      priority: 3,
    },
    height: {
      type: 'sizeInput',
      name: 'Height',
      value: null,
      priority: 4,
    },
    theme: true,
  },
};
