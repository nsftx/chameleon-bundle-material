export default {
  group: 'containers',
  type: 'panel',
  name: 'Panel',
  icon: 'border_outer',
  children: [
    'containers',
    'widgets',
  ],
  options: {
    color: {
      type: 'input',
      name: 'Color',
      value: 'transparent',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 25,
      },
      priority: 1,
    },
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
  },
};
