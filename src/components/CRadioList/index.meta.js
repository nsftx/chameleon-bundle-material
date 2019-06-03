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
    color: true,
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
      name: 'Radio Label',
      value: 'Radio',
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
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
      priority: 5,
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
    theme: true,
    validation: {
      type: 'group',
      group: 'validation',
      required: {
        type: 'check',
        name: 'Required',
        value: false,
      },
    },
  },
};
