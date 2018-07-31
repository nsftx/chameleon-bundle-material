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
      name: 'Changed',
      help: 'Input changed',
    },
    {
      name: 'Cleared',
      help: 'Input cleared / reset',
    },
    {
      name: 'FocusedIn',
      help: 'Input focused',
    },
    {
      name: 'FocusedOut',
      help: 'Input focused out / blurred',
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
      name: 'TextBox Label',
      value: 'Text Field',
      priority: 2,
    },
    prependIcon: {
      type: 'iconSource',
      name: 'Prepend Icon',
      value: null,
      priority: 3,
    },
    appendIcon: {
      type: 'iconSource',
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
    theme: true,
  },
};
