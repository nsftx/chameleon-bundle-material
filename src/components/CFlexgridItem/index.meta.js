export default {
  group: 'container-items',
  type: 'flexgrid-item',
  name: 'Flexgrid Item',
  hidden: true,
  icon: 'grid',
  children: [
    '*',
    '!flexgrid-item',
  ],
  options: {
    width: {
      type: 'select',
      name: 'Width',
      items: [
        {
          name: '1',
          value: '1',
        },
        {
          name: '2',
          value: '2',
        },
        {
          name: '3',
          value: '3',
        },
        {
          name: '4',
          value: '4',
        },
        {
          name: '5',
          value: '5',
        },

        {
          name: '6',
          value: '6',
        },
        {
          name: '7',
          value: '7',
        },
        {
          name: '8',
          value: '8',
        },
        {
          name: '9',
          value: '9',
        },
        {
          name: '10',
          value: '10',
        },
        {
          name: '11',
          value: '11',
        },
        {
          name: '12',
          value: '12',
        },
      ],
      value: '12',
      priority: 1,
    },
  },
};
