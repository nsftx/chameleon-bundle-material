export default {
  group: 'inputs',
  type: 'text',
  name: 'Text Box',
  icon: 'title',
  optionGroups: {
    data: {
      key: 'data',
      name: 'Data',
    },
    description: {
      key: 'description',
      name: 'Description',
    },
    style: {
      key: 'style',
      name: 'Style',
    },
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
  contextOptions: {
    type: {
      type: 'group',
      group: 'Type',
      generic: {
        key: 'generic',
        name: 'Generic',
      },
      email: {
        key: 'email',
        name: 'Email',
      },
      money: {
        key: 'money',
        name: 'Money',
      },
      number: {
        key: 'number',
        name: 'Number',
      },
      percentage: {
        key: 'percentage',
        name: 'Percentage',
      },
      phone: {
        key: 'phone',
        name: 'Phone',
      },
      url: {
        key: 'url',
        name: 'Url'
      },
      password: {
        key: 'password',
        name: 'Password',
      },
    }
  },
  options: {
    name: {
      type: 'fieldNameInput',
      name: 'Input Name',
      value: null,
      priority: 1,
      validation: {
        required: true,
      },
    },
    label: {
      type: 'input',
      name: 'Label',
      value: 'Text Field',
      priority: 2,
    },
    clearable: {
      type: 'check',
      name: 'Input Reset',
      value: false,
      priority: 3,
    },
    disabled: {
      type: 'check',
      name: 'Disable Input',
      value: false,
      priority: 4,
    },
    readonly: {
      type: 'check',
      name: 'Readonly',
      value: false,
      priority: 5,
    },
    description: {
      type: 'group',
      group: 'description',
      hint: {
        type: 'input',
        name: 'Hint Text',
        value: null,
      },
      tooltip: {
        type: 'input',
        name: 'Tooltip Text',
        value: null,
      },
      placeholder: {
        type: 'input',
        name: 'Placeholder Text',
        value: null,
      },
    },
    data: {
      type: 'group',
      group: 'data',
      value: {
        type: 'input',
        name: 'Input Source',
        value: null,
      },
    },
    style: {
      type: 'group',
      group: 'style',
      color: {
        type: 'colorPicker',
        name: 'Color',
        value: null,
      },
      theme: {
        type: 'select',
        name: 'Theme',
        items: '=$themes',
        value: null,
      },
      prependIcon: {
        type: 'iconSource',
        name: 'Prepend Icon',
        value: null,
      },
      appendIcon: {
        type: 'iconSource',
        name: 'Append Icon',
        value: null,
      },
      prefix: {
        type: 'input',
        name: 'Prefix',
        value: null,
      },
      suffix: {
        type: 'input',
        name: 'Suffix',
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
    },
  },
};
