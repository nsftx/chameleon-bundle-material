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
    },
    value: {
      type: 'input',
      name: 'Date Value',
      value: '2017-11-09T20:35:00.000Z',
    },
  },
};
