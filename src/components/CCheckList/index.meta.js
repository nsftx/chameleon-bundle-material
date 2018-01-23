export default {
  group: 'inputs',
  type: 'check-list',
  name: 'Check List',
  icon: 'done_all',
  options: {
    label: {
      type: 'input',
      name: 'Label text',
      value: 'Select options',
      priority: 1,
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend icon',
      value: '',
      priority: 2,
    },
    appendIcon: {
      type: 'input',
      name: 'Append icon',
      value: '',
      priority: 3,
    },
    hint: {
      type: 'input',
      name: 'Hint text',
      value: '',
      priority: 4,
    },
    hideDetails: {
      type: 'check',
      name: 'Hide details',
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
