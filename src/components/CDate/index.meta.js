export default {
  group: 'inputs',
  type: 'date',
  name: 'Date',
  icon: 'access_time',
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
      value: null,
      priority: 6,
    },
  },
};
