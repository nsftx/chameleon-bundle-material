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
  events: [
    {
      name: 'Changed',
      help: 'Date clicked, date value changed',
    },
    {
      name: 'VisibilityChanged',
      help: 'Date picker menu visibility changed',
    },
  ],
  options: {
    color: true,
    name: {
      type: 'input',
      name: 'Input Name',
      value: null,
      priority: 1,
    },
    label: {
      type: 'input',
      name: 'Label Text',
      value: null,
      priority: 2,
    },
    prependIcon: {
      type: 'iconSource',
      name: 'Prepend Icon',
      value: null,
      priority: 3,
    },
    appendIcon: {
      type: 'iconSource',
      name: 'Append Icon',
      value: null,
      priority: 4,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
      priority: 5,
    },
    tooltip: {
      type: 'input',
      name: 'Tooltip Text',
      value: null,
      priority: 6,
    },
    format: {
      type: 'input',
      name: 'Date Format',
      value: 'LLL',
      priority: 7,
    },
    value: {
      type: 'input',
      name: 'Date Value',
      value: [],
      priority: 8,
    },
    time: {
      type: 'subGroup',
      name: 'Time',
      enabled: {
        type: 'check',
        name: 'Enable time',
        value: false,
      },
      priority: 11,
    },
    clearable: {
      type: 'check',
      name: 'Enable Input Clear',
      value: false,
      priority: 9,
    },
    calendar: {
      type: 'check',
      name: 'Set Calendar View',
      value: false,
      priority: 10,
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
    theme: true,
  },
};
