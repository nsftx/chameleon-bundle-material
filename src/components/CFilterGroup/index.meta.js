export default {
  group: 'widgets',
  type: 'filter-group',
  name: 'Filter Group',
  icon: 'filter_list',
  actions: [
    {
      name: 'apply',
      help: 'Apply',
    },
    {
      name: 'clear',
      help: 'Clear',
    },
  ],
  events: [
    {
      name: 'Applied',
    },
    {
      name: 'Cleared',
    },
  ],
  options: {
    name: {
      type: 'input',
      name: 'Name',
      value: 'filterGroup',
      priority: 1,
    },
    autoSubmit: {
      type: 'check',
      name: 'Auto Submit',
      value: false,
    },
    color: {
      group: 'style',
    },
    theme: {
      group: 'style',
    },
    flat: {
      type: 'check',
      name: 'No Shadow',
      group: 'style',
      value: false,
    },
    direction: {
      type: 'select',
      name: 'Direction',
      group: 'style',
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
    },
    spacing: {
      type: 'check',
      name: 'Group Spacing',
      group: 'style',
      value: false,
    },
    elementSpacing: {
      type: 'select',
      name: 'Element Spacing',
      group: 'style',
      items: [
        {
          name: 'None',
          value: 'none',
        },
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
      value: 'xs',
    },
  },
  children: [
    'date',
    'date-range',
    'select',
    'select-list',
    'text-input',
  ],
};
