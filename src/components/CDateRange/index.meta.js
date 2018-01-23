export default {
  group: 'inputs',
  type: 'date-range',
  name: 'Date Range',
  icon: 'date_range',
  options: {
    prependIcon: {
      type: 'input',
      name: 'Prepend icon',
      value: '',
      priority: 1,
    },
    appendIcon: {
      type: 'input',
      name: 'Append icon',
      value: '',
      priority: 2,
    },
    hint: {
      type: 'input',
      name: 'Hint text',
      value: '',
      priority: 3,
    },
    tooltip: {
      type: 'input',
      name: 'Tooltip text',
      value: '',
      priority: 4,
    },
    format: {
      type: 'input',
      name: 'Date format',
      value: 'LLL',
      priority: 5,
    },
    value: {
      type: 'input',
      name: 'Date Value',
      value: [],
      priority: 6,
    },
  },
};
