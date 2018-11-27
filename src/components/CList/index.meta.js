const itemInterface = [
  {
    name: 'label',
    type: 'String',
    label: 'Label',
  },
  {
    name: 'title',
    type: 'String',
    label: 'Title',
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
    },
    theme: {
      value: null,
      group: 'style',
    },
    flat: {
      type: 'check',
      group: 'style',
      name: 'No Shadow',
      value: false,
    },
    imageRadius: {
      type: 'check',
      group: 'style',
      name: 'Image Radius',
      value: true,
    },
    itemRadius: {
      type: 'check',
      group: 'style',
      name: 'Item Radius',
      value: true,
    },
    fluid: {
      type: 'check',
      group: 'style',
      name: 'Full Width',
      value: true,
    },
    titleBorderRadius: {
      type: 'check',
      group: 'style',
      name: 'Title Background Radius',
      value: true,
    },
    titleColor: {
      type: 'colorPicker',
      group: 'style',
      name: 'Title Background Color',
      value: 'green accent-4',
    },
    spacing: {
      type: 'select',
      group: 'style',
      name: 'Spacing',
      items: [
        {
          name: 'None',
          value: '',
        },
        {
          name: 'Extra-Small',
          value: 'xs',
        },
        {
          name: 'Small',
          value: 'sm',
        },
        {
          name: 'Medium',
          value: 'md',
        },
        {
          name: 'Large',
          value: 'lg',
        },
        {
          name: 'Extra-Large',
          value: 'xl',
        },
      ],
      value: 'md',
    },
    noDataText: {
      type: 'input',
      group: 'localization',
      name: 'No Data Text',
      value: null,
    },
    noResultsText: {
      type: 'input',
      group: 'localization',
      name: 'No Results Text',
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
    },
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
      schema: itemInterface,
    },
    rowsPerPageItems: {
      type: 'input',
      group: 'data',
      name: 'Rows Per Page Items',
      value: null,
    },
    rowsPerPage: {
      type: 'input',
      group: 'data',
      name: 'Rows Per Page',
      value: 5,
    },
    startPage: {
      type: 'input',
      group: 'data',
      name: 'Start With Page',
      value: 1,
    },
    sortBy: {
      type: 'input',
      group: 'data',
      name: 'Sort Items By',
      value: null,
    },
    sortDescending: {
      type: 'check',
      group: 'data',
      name: 'Sort Descending',
      value: false,
    },
  },
};
