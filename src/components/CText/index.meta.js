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
  actions: [
    {
      name: 'setInputValue',
      help: 'Input field updated',
    },
    {
      name: 'setItemDisabledValue',
      help: 'Input field disabled value',
    },
  ],
  events: [
    {
      name: 'Blurred',
      help: 'Input blurred',
    },
    {
      name: 'Changed',
      help: 'Input changed',
    },
    {
      name: 'Cleared',
      help: 'Input cleared / reset',
    },
    {
      name: 'Focused',
      help: 'Input focused',
    },
  ],
  options: {
    name: {
      type: 'input',
      name: 'Input Name',
      value: null,
      priority: 1,
    },
    label: {
      type: 'input',
      name: 'TextBox Label',
      value: 'Text Field',
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
    prefix: {
      type: 'input',
      name: 'Prefix',
      value: null,
      priority: 5,
    },
    suffix: {
      type: 'input',
      name: 'Suffix',
      value: null,
      priority: 6,
    },
    placeholder: {
      type: 'input',
      name: 'Placeholder Text',
      value: null,
      priority: 7,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
      priority: 8,
    },
    tooltip: {
      type: 'input',
      name: 'Tooltip Text',
      value: null,
      priority: 9,
    },
    clearable: {
      type: 'check',
      name: 'Enable Input Reset',
      value: false,
      priority: 10,
    },
    multiLine: {
      type: 'check',
      name: 'Enable Multiline',
      value: false,
      priority: 11,
    },
    disabled: {
      type: 'check',
      name: 'Disable Input',
      value: false,
      priority: 12,
    },
    mask: {
      type: 'subGroup',
      name: 'Mask',
      predefined: {
        type: 'input',
        name: 'Predefined',
        value: null,
      },
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
