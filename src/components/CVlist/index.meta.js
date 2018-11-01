export default {
  group: 'containers',
  type: 'vlist',
  name: 'Vertical List',
  icon: 'view_stream',
  children: [
    '*',
    '!inputs',
    '!container-items',
  ],
  options: {
    color: {
      type: 'colorPicker',
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
    gutter: {
      type: 'check',
      name: 'Spacing',
      value: false,
      priority: 3,
    },
    theme: true,
  },
};
