export default {
  group: 'inputs',
  type: 'check',
  name: 'Checkbox',
  icon: 'check',
  optionGroups: {
    validation: {
      key: 'validation',
      name: 'Validation',
    },
  },
  options: {
    label: {
      type: 'input',
      name: 'Check Label',
      value: null,
      priority: 1,
    },
    color: {
      type: 'input',
      name: 'Color',
      value: null,
      priority: 2,
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend Icon',
      value: null,
      priority: 3,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: null,
      priority: 4,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
      priority: 5,
    },
    disabled: {
      type: 'check',
      name: 'Disabled',
      value: false,
      priority: 6,
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
