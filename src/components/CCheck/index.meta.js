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
  actions: [
    {
      name: 'setInputValue',
      help: 'Checkbox input field updated',
    },
    {
      name: 'setItemDisabledValue',
      help: 'Input field disabled value',
    },
  ],
  events: [
    {
      name: 'Changed',
      help: 'Checkbox clicked, value changed',
    },
  ],
  options: {
    color: true,
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
    theme: true,
  },
};
