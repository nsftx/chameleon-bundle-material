const itemInterface = [
  {
    name: 'value',
    type: 'String',
    label: 'Value',
  },
  {
    name: 'text',
    type: 'String',
    label: 'Text',
  },
  {
    name: 'description',
    type: 'String',
    label: 'Description',
  },
  {
    name: 'icon',
    type: 'Icon',
    label: 'Icon',
  },
  {
    name: 'thumb',
    type: 'Image',
    label: 'Image',
  },
];

export default {
  group: 'inputs',
  type: 'select-list',
  name: 'Select List',
  icon: 'featured_play_list',
  optionGroups: {
    validation: {
      key: 'validation',
      name: 'Validation',
    },
  },
  actions: [
    {
      name: 'setItemDisabledValue',
      help: 'Input field disabled value',
    },
  ],
  events: [
    {
      name: 'Selected',
      help: 'Select clicked and item selected',
      schema: itemInterface,
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
      name: 'Select List Label',
      value: 'Select',
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
    tooltip: {
      type: 'input',
      name: 'Tooltip Text',
      value: null,
      priority: 6,
    },
    clearable: {
      type: 'check',
      name: 'Enable Input Clear',
      value: false,
      priority: 10,
    },
    readonly: {
      type: 'check',
      name: 'Enable Readonly',
      value: false,
      priority: 8,
    },
    disabled: {
      type: 'check',
      name: 'Disabled',
      value: false,
      priority: 9,
    },
    multiple: {
      type: 'check',
      name: 'Multiple Selections',
      value: true,
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
    theme: true,
  },
};
