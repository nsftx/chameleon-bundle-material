export default {
  group: 'inputs',
  type: 'date-range',
  name: 'Date Range',
  icon: 'date_range',
  optionGroups: {
    validation: {
      key: 'validation',
      name: 'Validation',
    },
  },
  options: {
    prependIcon: {
      type: 'input',
      name: 'Prepend Icon',
      value: null,
      priority: 1,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: null,
      priority: 2,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
      priority: 3,
    },
    tooltip: {
      type: 'input',
      name: 'Tooltip Text',
      value: null,
      priority: 4,
    },
    format: {
      type: 'input',
      name: 'Date Format',
      value: 'LLL',
      priority: 5,
    },
    value: {
      type: 'input',
      name: 'Date Value',
      value: [],
      priority: 6,
    },
    time: {
      type: 'subGroup',
      name: 'Time',
      enabled: {
        type: 'check',
        name: 'Enable time',
        value: false,
      },
    },
    validation: {
      type: 'group',
      group: 'validation',
      required: {
        type: 'check',
        name: 'Enable required',
        value: false,
      },
      minDate: {
        type: 'input',
        name: 'Min Date',
        value: null,
      },
      maxDate: {
        type: 'input',
        name: 'Max Date',
        value: null,
      },
    },
  },
};
