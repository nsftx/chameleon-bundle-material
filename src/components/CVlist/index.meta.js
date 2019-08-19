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
      group: 'style',
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
      group: 'style',
      value: false,
      priority: 2,
    },
    spaced: {
      type: 'check',
      name: 'Spacing',
      group: 'style',
      value: false,
      priority: 3,
    },
    height: {
      type: 'sizeInput',
      name: 'Height',
      group: 'style',
      value: null,
      priority: 4,
    },
    theme: {
      group: 'style',
    },
  },
};
