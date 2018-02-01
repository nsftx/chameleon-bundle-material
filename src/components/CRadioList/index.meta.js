export default {
  group: 'inputs',
  type: 'radio-list',
  name: 'Radio List',
  icon: 'radio_button_checked',
  optionGroups: {
    validation: {
      key: 'validation',
      name: 'Validation',
    },
  },
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
    validation: {
      type: 'group',
      group: 'validation',
      required: {
        type: 'check',
        name: 'Enable required',
        value: false,
      },
    },
  },
};
