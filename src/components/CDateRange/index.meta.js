export default {
  group: 'inputs',
  type: 'date-range',
  name: 'Date Range',
  icon: 'date_range',
  options: {
    prependIcon: {
      type: 'input',
      name: 'Prepend icon',
      value: 'person',
    },
    appendIcon: {
      type: 'input',
      name: 'Append icon',
      value: '',
    },
    hint: {
      type: 'input',
      name: 'Hint text',
      value: '',
    },
    tooltip: {
      type: 'input',
      name: 'Tooltip text',
      value: '',
    },
    format: {
      type: 'input',
      name: 'Date format',
      value: 'LLL',
    },
    value: {
      type: 'input',
      name: 'Date Value',
      value: [],
    },
  },
};
