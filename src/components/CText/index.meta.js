export default {
  group: 'inputs',
  type: 'text',
  name: 'Text Box',
  icon: 'title',
  optionGroups: {
    validation: {
      key: 'validation',
      name: 'Validation',
    },
  },
  options: {
    label: {
      type: 'input',
      name: 'TextBox Label',
      value: null,
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
    prefix: {
      type: 'input',
      name: 'Prefix',
      value: null,
      priority: 4,
    },
    suffix: {
      type: 'input',
      name: 'Suffix',
      value: null,
      priority: 5,
    },
    placeholder: {
      type: 'input',
      name: 'Placeholder Text',
      value: null,
      priority: 6,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
      priority: 7,
    },
    tooltip: {
      type: 'input',
      name: 'Tooltip Text',
      value: null,
      priority: 8,
    },
    multiLine: {
      type: 'check',
      name: 'Enable Multiline',
      value: false,
      priority: 9,
    },
    validation: {
      type: 'group',
      group: 'validation',
      required: {
        type: 'check',
        name: 'Enable required',
        value: false,
      },
      pattern: {
        type: 'subGroup',
        name: 'Pattern',
        predefined: {
          type: 'input',
          name: 'Predefined',
          value: null,
        },
      },
      minLength: {
        type: 'input',
        name: 'Min Length',
        value: null,
      },
      maxLength: {
        type: 'input',
        name: 'Max Length',
        value: null,
      },
    },
  },
};
