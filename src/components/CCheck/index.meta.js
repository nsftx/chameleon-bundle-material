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
    name: {
      type: 'input',
      name: 'Input Name',
      value: null,
      priority: 1,
    },
    label: {
      type: 'input',
      name: 'Check Label',
      value: 'Check',
      priority: 2,
    },
    color: {
      type: 'input',
      name: 'Color',
      value: null,
      priority: 3,
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend Icon',
      value: null,
      priority: 4,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: null,
      priority: 5,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
      priority: 6,
    },
    disabled: {
      type: 'check',
      name: 'Disabled',
      value: false,
      priority: 7,
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
