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
      priority: 2,
      validation: {
        required: true,
      },
    },
    label: {
      type: 'input',
      name: 'Notification Message Label',
      value: 'Calendar',
      priority: 3,
    },
    time: {
      type: 'subGroup',
      name: 'Time',
      enabled: {
        type: 'check',
        name: 'Enable time',
        value: false,
      },
      priority: 4,
    },
    validation: {
      type: 'group',
      group: 'validation',
      required: {
        type: 'check',
        name: 'Required',
        value: false,
      },
      minDate: {
        type: 'date',
        name: 'Min Date',
        value: null,
      },
      maxDate: {
        type: 'date',
        name: 'Max Date',
        value: null,
      },
    },
    theme: true,
  },
};
