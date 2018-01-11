export default {
  group: 'containers',
  type: 'hlist',
  name: 'Horizontal List',
  icon: 'view_stream',
  children: [
    'containers',
    'widgets',
  ],
  options: {
    color: {
      type: 'input',
      name: 'Color',
      value: 'white',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 25,
      },
    },
    flat: {
      type: 'check',
      name: 'No shadow',
      value: false,
    },
    gutter: {
      type: 'check',
      name: 'Spacing',
      value: false,
    },
  },
};
