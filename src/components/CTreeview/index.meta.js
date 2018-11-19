const itemInterface = [
  {
    name: 'id',
    type: 'String',
    label: 'Key',
  },
  {
    name: 'name',
    type: '',
    label: 'Name',
  },
  {
    name: 'children',
    type: 'Array',
    label: 'Children',
  },
];

export default {
  group: 'widgets',
  type: 'treeview',
  name: 'Tree View',
  icon: 'list_alt',
  optionGroups: {
    data: {
      key: 'data',
      name: 'Data',
    },
    style: {
      key: 'style',
      name: 'Style',
    },
    behaviour: {
      key: 'behaviour',
      name: 'Behaviour',
    },
  },
  actions: [
    {
      name: 'setDataSource',
      help: 'Sets data source from event data',
    },
    {
      name: 'setState',
      help: 'This action sets state of element from event data',
    },
    {
      name: 'setSelection',
      help: 'This action sets selection of element from event data',
    },
    {
      name: 'setActiveItem',
      help: 'This action sets active item of element from event data',
    },
    {
      name: 'addItem',
      help: 'This action adds new item using data source connector',
    },
  ],
  events: [
    {
      name: 'DataSourceChanged',
      help: 'Fires when data source is changed',
    },
    {
      name: 'StateChanged',
      help: 'Fires when data state is changed',
    },
    {
      name: 'SelectionChanged',
      help: 'Fires when tree selection array is changed',
    },
    {
      name: 'ActiveItemChanged',
      help: 'Fires active element item is changed',
    },
    {
      name: 'GetAsyncChildren',
      help: 'Fires when children property of branch in empty array',
    },
  ],
  options: {
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
      schema: itemInterface,
    },
    itemChildren: {
      type: 'input',
      group: 'data',
      name: 'Item Children',
      value: null,
    },
    itemDisplay: {
      type: 'input',
      group: 'data',
      name: 'Item Display',
      value: null,
    },
    itemValue: {
      type: 'input',
      group: 'data',
      name: 'Item Value',
      value: null,
    },
    theme: {
      group: 'style',
    },
    color: {
      group: 'style',
    },
    selectorColor: {
      type: 'colorPicker',
      group: 'style',
      name: 'Selector Color',
      value: null,
    },
    selectorPosition: {
      type: 'select',
      group: 'style',
      name: 'Selector Position',
      items: [
        {
          name: 'Left',
          value: 'left',
        },
        {
          name: 'Right',
          value: 'right',
        },
      ],
      value: 'left',
    },
    expanderPosition: {
      type: 'select',
      group: 'style',
      name: 'Expander Position',
      items: [
        {
          name: 'Left',
          value: 'left',
        },
        {
          name: 'Right',
          value: 'right',
        },
      ],
      value: 'left',
    },
    defaultState: {
      type: 'select',
      group: 'behaviour',
      name: 'Default State',
      items: [
        {
          name: 'Expanded All',
          value: 'all',
        },
        {
          name: 'expandedFirstLevel',
          value: 'first',
        },
        {
          name: 'Expanded None',
          value: 'none',
        },
      ],
      value: 'first',
    },
    selection: {
      type: 'select',
      group: 'behaviour',
      name: 'Selection',
      items: [
        {
          name: 'Single Select',
          value: 'single',
        },
        {
          name: 'Multi Select',
          value: 'multi',
        },
        {
          name: 'Leafs Single Select',
          value: 'singleLeafs',
        },
        {
          name: 'None',
          value: 'none',
        },
      ],
      value: 'multiSelect',
    },
  },
};
