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
    autoGrow: {
      type: 'check',
      name: 'Auto Grow',
      value: false,
      priority: 5,
    },
    placeholder: {
      type: 'input',
      name: 'Placeholder Text',
      value: false,
      priority: 6,
    },
    outline: {
      type: 'check',
      name: 'Outline',
      value: false,
      priority: 7,
    },
    rowHeight: {
      type: 'input',
      name: 'Row Height',
      value: 5,
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
    validation: {
      type: 'group',
      group: 'validation',
      required: {
        type: 'check',
        name: 'Required',
        value: false,
      },
    },
    theme: true,
  },
};
