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
  type: 'check-list',
  name: 'Check List',
  icon: 'done_all',
  optionGroups: {
    validation: {
      key: 'validation',
      name: 'Validation',
    },
  },
  events: [
    {
      name: 'Changed',
      help: 'Checkbox clicked, checkbox list changed',
    },
  ],
  options: {
    name: {
      type: 'input',
      name: 'Input Name',
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
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
      priority: 4,
    },
    hideDetails: {
      type: 'check',
      name: 'Hide Details',
      value: false,
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
      minCount: {
        type: 'input',
        name: 'Min Count',
        value: 1,
      },
      maxCount: {
        type: 'input',
        name: 'Max Count',
        value: 10,
      },
    },
  },
};
