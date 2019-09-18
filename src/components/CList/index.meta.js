const itemInterface = [
  {
    name: 'label',
    type: 'String',
    label: 'Title 1',
  },
  {
    name: 'title',
    type: 'String',
    label: 'Title 2',
  },
  {
    name: 'subtitle',
    type: 'String',
    label: 'Subtitle',
  },
  {
    name: 'description',
    type: 'String',
    label: 'Description',
  },
  {
    name: 'thumb',
    type: 'Image',
    label: 'Image',
  },
  {
    name: 'icon',
    type: 'Icon',
    label: 'Icon',
  },
];

export default {
  group: 'widgets',
  type: 'list',
  name: 'List',
  icon: 'list',
  actions: [
    {
      name: 'setDataSource',
      help: 'Sets table data source from event data',
    },
    {
      name: 'setPage',
      help: 'Go to page (pagination) from event data',
    },
    {
      name: 'setRowsPerPage',
      help: 'Set rowsPerPage from event data',
    },
  ],
  events: [
    {
      name: 'DataSourceChanged',
      help: 'Fires when table data source is changed',
    },
    {
      name: 'SelectedItemChanged',
      help: 'Fires when table item gets selected',
      schema: itemInterface,
    },
    {
      name: 'PaginationChanged',
      help: 'Fires when table page gets changed',
    },
  ],
  options: {
    hideActions: {
      type: 'check',
      name: 'Hide Actions',
      value: false,
      priority: 3,
    },
    noOfRows: {
      type: 'select',
      name: 'Grid Type',
      items: [
        {
          name: '1',
          value: '12',
        },
        {
          name: '2',
          value: '6',
        },
        {
          name: '3',
          value: '4',
        },
      ],
      value: '12',
      priority: 2,
    },
    color: {
      value: null,
      group: 'style',
      priority: 2,
    },
    theme: {
      value: null,
      group: 'style',
      priority: 1,
    },
    flat: {
      type: 'check',
      group: 'style',
      name: 'No Shadow',
      value: false,
      priority: 9,
    },
    imageRadius: {
      type: 'check',
      group: 'style',
      name: 'Image Radius',
      value: true,
      priority: 7,
    },
    itemRadius: {
      type: 'check',
      group: 'style',
      name: 'Item Radius',
      value: true,
      priority: 6,
    },
    fluid: {
      type: 'check',
      group: 'style',
      name: 'Full Width',
      value: true,
      priority: 8,
    },
    titleRadius: {
      type: 'check',
      group: 'style',
      name: 'Title Background Radius',
      value: true,
      priority: 5,
    },
    titleColor: {
      type: 'colorPicker',
      group: 'style',
      name: 'Title Background Color',
      value: 'green accent-4',
      priority: 3,
    },
    spacing: {
      type: 'select',
      group: 'style',
      name: 'Spacing',
      items: [
        {
          name: 'None',
          value: 0,
        },
        {
          name: 'Small',
          value: 2,
        },
        {
          name: 'Medium',
          value: 4,
        },
        {
          name: 'Large',
          value: 6,
        },
        {
          name: 'Extra-Large',
          value: 8,
        },
      ],
      value: 0,
      priority: 4,
    },
    showOverflow: {
      type: 'check',
      group: 'style',
      name: 'Show Text Overflow',
      value: false,
      priority: 10,
    },
    noDataText: {
      type: 'input',
      group: 'localization',
      name: 'No Data Text',
      value: null,
    },
    rowsPerPageText: {
      type: 'input',
      group: 'localization',
      name: 'Rows Per Page Text',
      value: null,
    },
    header: {
      type: 'input',
      group: 'data',
      name: 'Header',
      value: null,
      priority: 2,
    },
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
      schema: itemInterface,
      priority: 1,
    },
    rowsPerPageItems: {
      type: 'input',
      group: 'data',
      name: 'Rows Per Page Items',
      value: null,
      priority: 7,
    },
    rowsPerPage: {
      type: 'number',
      group: 'data',
      name: 'Rows Per Page',
      value: 5,
      priority: 6,
    },
    sortBy: {
      type: 'select',
      group: 'data',
      name: 'Sort Items By',
      items: '=$activePageElement.dataSource.schema',
      valueProp: ['mapName', 'name'],
      displayProp: ['title', 'name'],
      returnObject: true,
      clearable: true,
      value: null,
      priority: 3,
    },
    sort: {
      type: 'select',
      group: 'data',
      name: 'Default Sorting',
      items: [
        {
          name: 'Ascending',
          value: 'asc',
        },
        {
          name: 'Descending',
          value: 'desc',
        },
      ],
      clearable: true,
      value: null,
      priority: 4,
    },
  },
};
