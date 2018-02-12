export default {
  group: 'containers',
  type: 'flexgrid',
  name: 'Flex Grid',
  icon: 'grid',
  children: [
    'flexgrid-item',
  ],
  options: {
    itemsCount: {
      type: 'childrenCountInput',
      name: 'Item count',
      value: '1',
      validation: {
        required: true,
        min: 1,
      },
      priority: 1,
    },
    direction: {
      type: 'select',
      name: 'Grid direction',
      items: [
        {
          id: 1,
          name: 'Row',
          value: 'row',
        },
        {
          id: 2,
          name: 'Column',
          value: 'column',
        },
      ],
      returnObject: false,
      displayProp: 'name',
      valueProp: 'value',
      value: 'row',
      priority: 2,
    },
    spacing: {
      type: 'select',
      name: 'Spacing',
      items: [
        {
          id: 1,
          name: 'Extra-Small',
          value: 'extra-small',
        },
        {
          id: 2,
          name: 'Small',
          value: 'small',
        },
        {
          id: 3,
          name: 'Medium',
          value: 'mediun',
        },
        {
          id: 4,
          name: 'Large',
          value: 'large',
        },
        {
          id: 5,
          name: 'Extra-Large',
          value: 'extra-large',
        },
      ],
      returnObject: false,
      displayProp: 'name',
      valueProp: 'value',
      value: 'medium',
      priority: 3,
    },
    fluid: {
      type: 'check',
      name: 'Full Width',
      value: false,
    },
  },
};
