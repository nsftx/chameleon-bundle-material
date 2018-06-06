const itemInterface = [
  {
    name: 'value',
    type: 'String',
    label: 'Value',
  },
  {
    name: 'label',
    type: 'String',
    label: 'Label',
  },
];

export default {
  group: 'inputs',
  type: 'radio-list',
  name: 'Radio List',
  icon: 'radio_button_checked',
  optionGroups: {
    validation: {
      key: 'validation',
      name: 'Validation',
    },
  },
  events: [
    {
      name: 'Changed',
      help: 'RadioList clicked, value changed',
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
      name: 'Radio Label',
      value: 'Radio',
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
    color: {
      type: 'input',
      name: 'Checkbox Color',
      value: 'primary',
      priority: 6,
    },
    disabled: {
      type: 'check',
      name: 'Disabled',
      value: false,
      priority: 7,
    },
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
      schema: itemInterface,
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
