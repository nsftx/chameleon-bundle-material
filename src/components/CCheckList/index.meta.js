export default {
  group: 'inputs',
  type: 'check-list',
  name: 'Check List',
  icon: 'done_all',
  options: {
    label: {
      type: 'input',
      name: 'Label text',
      value: 'Select check',
    },
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
    hideDetails: {
      type: 'check',
      name: 'Hide details',
      value: false,
    },
    disabled: {
      type: 'check',
      name: 'Disabled',
      value: false,
    },
    validation: {
      required: false,
      minCount: 1,
      maxCount: 2,
    },
  },
};
