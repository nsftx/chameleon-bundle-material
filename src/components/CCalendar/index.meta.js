export default {
  group: 'inputs',
  type: 'calendar',
  name: 'Calendar',
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
  ],
  options: {
    color: true,
    name: {
      type: 'fieldNameInput',
      name: 'Input Name used by Form',
      value: null,
      priority: 1,
      validation: {
        required: true,
      },
    },
    // ????
    format: {
      type: 'input',
      name: 'Date Format',
      value: 'LLL',
      priority: 2,
    },
    time: {
      type: 'subGroup',
      name: 'Time',
      enabled: {
        type: 'check',
        name: 'Enable time',
        value: false,
      },
      priority: 3,
    },
    validation: {
      type: 'group',
      group: 'validation',
      // ??
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
