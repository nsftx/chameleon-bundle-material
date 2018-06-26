export default {
  group: 'containers',
  type: 'flexgrid',
  name: 'Flex Grid',
  icon: 'view_compact',
  children: [
    'flexgrid-item',
  ],
  options: {
    color: true,
    itemsCount: {
      type: 'childrenCountInput',
      name: 'Item Count',
      value: '1',
      validation: {
        required: true,
        min: 1,
      },
      priority: 1,
    },
    direction: {
      type: 'select',
      name: 'Grid Direction',
      items: [
        {
          name: 'Row',
          value: 'row',
        },
        {
          name: 'Column',
          value: 'column',
        },
      ],
      value: 'row',
      priority: 2,
    },
    spacing: {
      type: 'select',
      name: 'Spacing',
      items: [
        {
          name: 'Extra-Small',
          value: 'xs',
        },
        {
          name: 'Small',
          value: 'sm',
        },
        {
          name: 'Medium',
          value: 'md',
        },
        {
          name: 'Large',
          value: 'lg',
        },
        {
          name: 'Extra-Large',
          value: 'xl',
        },
      ],
      value: 'md',
      priority: 3,
    },
    fluid: {
      type: 'check',
      name: 'Full Width',
      value: false,
      priority: 4,
    },
    theme: true,
  },
};
