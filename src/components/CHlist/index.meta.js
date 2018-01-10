export default {
  group: 'containers',
  type: 'hlist',
  name: 'Horizontal List',
  icon: 'view_stream',
  children: true,
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
  },
};
