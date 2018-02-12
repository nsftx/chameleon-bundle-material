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
          id: 1,
          name: '1',
          value: '1',
        },
        {
          id: 2,
          name: '2',
          value: '2',
        },
        {
          id: 3,
          name: '3',
          value: '3',
        },
        {
          id: 4,
          name: '4',
          value: '4',
        },
        {
          id: 5,
          name: '5',
          value: '5',
        },

        {
          id: 6,
          name: '6',
          value: '6',
        },
        {
          id: 7,
          name: '7',
          value: '7',
        },
        {
          id: 8,
          name: '8',
          value: '8',
        },
        {
          id: 9,
          name: '9',
          value: '9',
        },
        {
          id: 10,
          name: '10',
          value: '10',
        },
        {
          id: 11,
          name: '11',
          value: '11',
        },
        {
          id: 12,
          name: '12',
          value: '12',
        },
      ],
      returnObject: false,
      displayProp: 'name',
      valueProp: 'value',
      value: '12',
      priority: 1,
    },
  },
}