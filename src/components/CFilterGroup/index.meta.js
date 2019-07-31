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
      name: 'Spacing',
      group: 'style',
      value: false,
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
