export default {
  group: 'inputs',
  type: 'calculation',
  name: 'Calculation Box',
  icon: 'functions',
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
      help: 'Input blurred',
    },
  ],
  options: {
    name: {
      type: 'fieldNameInput',
      name: 'Input Name',
      value: null,
      priority: 1,
    },
    label: {
      type: 'input',
      name: 'Calculation Label',
      value: 'Calculation Field',
      priority: 2,
    },
    placeholder: {
      type: 'input',
      name: 'Placeholder Label',
      value: 'Please enter formula',
      priority: 3,
    },
    prependIcon: {
      type: 'iconSource',
      name: 'Prepend Icon',
      value: null,
      priority: 4,
    },
    appendIcon: {
      type: 'iconSource',
      name: 'Append Icon',
      value: null,
      priority: 5,
    },
    prefix: {
      type: 'input',
      name: 'Prefix',
      value: null,
      priority: 6,
    },
    suffix: {
      type: 'input',
      name: 'Suffix',
      value: null,
      priority: 7,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
      priority: 8,
    },
    value: {
      type: 'input',
      name: 'Calculation Value',
      value: null,
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
    },
  },
};
