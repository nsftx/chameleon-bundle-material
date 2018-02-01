export default {
  group: 'inputs',
  type: 'check-list',
  name: 'Check List',
  icon: 'done_all',
  optionGroups: {
    validation: {
      key: 'validation',
      name: 'Validation',
    },
  },
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
      value: null,
      priority: 2,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: null,
      priority: 3,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
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
    validation: {
      type: 'group',
      group: 'validation',
      required: {
        type: 'check',
        name: 'Enable required',
        value: false,
      },
      minCount: {
        type: 'input',
        name: 'Min Count',
        value: null,
      },
      maxCount: {
        type: 'input',
        name: 'Max Count',
        value: null,
      },
    },
  },
};