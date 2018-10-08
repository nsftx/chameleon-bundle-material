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
      type: 'sizeInput',
      name: 'Width',
      value: null,
      priority: 3,
    },
    height: {
      type: 'sizeInput',
      name: 'Height',
      value: null,
      priority: 4,
      units: [
        {
          value: 'px',
          name: 'px',
        },
        {
          value: '%',
          name: '%',
        },
        {
          value: 'eee',
          name: 'eee',
        },
      ],
    },
    theme: true,
  },
};
