export default {
  group: 'inputs',
  type: 'date',
  name: 'Date',
  icon: 'access_time',
  options: {
    prependIcon: {
      type: 'input',
      name: 'Prepend Icon',
      value: 'person',
      priority: 1,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: '',
      priority: 2,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: '',
      priority: 3,
    },
    tooltip: {
      type: 'input',
      name: 'Tooltip Text',
      value: '',
      priority: 4,
    },
    // TODO set options for object properties
    // time: {
    //   type: 'check',
    //   name: 'Enable Time',
    //   value: false,
    // },
    format: {
      type: 'input',
      name: 'Date Format',
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
