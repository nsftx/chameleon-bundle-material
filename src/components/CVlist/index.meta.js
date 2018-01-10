export default {
  group: 'containers',
  type: 'vlist',
  name: 'Vertical List',
  icon: 'view_week',
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
