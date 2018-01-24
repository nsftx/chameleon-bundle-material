export default {
  group: 'inputs',
  type: 'check-list',
  name: 'Check List',
  icon: 'done_all',
  options: {
    label: {
      type: 'input',
      name: 'Check List Label',
      value: 'Select options',
      priority: 1,
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend Icon',
      value: '',
      priority: 2,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: '',
      priority: 3,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: '',
      priority: 4,
    },
    hideDetails: {
      type: 'check',
      name: 'Hide Details',
      value: false,
      priority: 6,
    },
    disabled: {
      type: 'check',
      name: 'Disabled',
      value: false,
      priority: 5,
    },
  },
};