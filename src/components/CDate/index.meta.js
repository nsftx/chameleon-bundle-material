export default {
  group: 'inputs',
  type: 'date',
  name: 'Date',
  icon: 'access_time',
  options: {
    prependIcon: {
      type: 'input',
      name: 'Prepend icon',
      value: 'person',
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
    // TODO set options for object properties
    // time: {
    //   type: 'check',
    //   name: 'Enable time',
    //   value: false,
    // },
    format: {
      type: 'input',
      name: 'Date format',
      value: 'LLL',
      priority: 5,
    },
    value: {
      type: 'input',
      name: 'Date Value',
      value: '2017-11-09T20:35:00.000Z',
      priority: 6,
    },
  },
};
