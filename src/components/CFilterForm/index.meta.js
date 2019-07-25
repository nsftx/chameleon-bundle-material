export default {
  group: 'widgets',
  type: 'filter-form',
  name: 'Filter Form',
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
      value: 'filterForm',
      priority: 1,
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
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
    },
    autoSubmit: {
      type: 'check',
      group: 'data',
      name: 'Auto Submit',
      value: false,
    },
  },
  children: [
    'inputs',
  ],
};
