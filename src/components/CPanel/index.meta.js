export default {
  group: 'containers',
  type: 'panel',
  name: 'Panel',
  icon: 'border_outer',
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
    width: {
      type: 'input',
      name: 'Width',
      value: null,
      priority: 3,
    },
    height: {
      type: 'input',
      name: 'Height',
      value: null,
      priority: 4,
    },
    theme: true,
  },
};
