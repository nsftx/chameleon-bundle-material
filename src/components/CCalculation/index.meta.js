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
      name: 'Focused',
      help: 'Input focused',
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
      name: 'Blured',
      help: 'Input focus changed',
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
