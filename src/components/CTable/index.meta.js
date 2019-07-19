import { binding } from '@/utility';

export default {
  group: 'widgets',
  type: 'table',
  name: 'Table',
  icon: 'grid_on',
  actions: [
    {
      name: 'setDataSource',
      help: 'Sets table data source from event data',
      ignoreOwnEvents: [
        'DataSourceChanged',
      ],
    },
    {
      name: 'setPage',
      help: 'Go to page (pagination) from event data',
    },
    {
      name: 'setRowsPerPage',
      help: 'Set rowsPerPage from event data',
    },
    {
      name: 'setDataSourceParams',
      help: 'Set table data source params',
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
    },
    {
      name: 'PaginationChanged',
      help: 'Fires when table page gets changed',
    },
  ],
  options: {
    flat: {
      type: 'check',
      name: 'No Shadow',
      value: false,
      priority: 1,
    },
    noDataText: {
      type: 'input',
      group: 'localization',
      name: 'No Data Text',
      value: null,
      priority: 2,
    },
    noResultsText: {
      type: 'input',
      group: 'localization',
      name: 'No Results Text',
      value: null,
      priority: 3,
    },
    rowsPerPageText: {
      type: 'input',
      group: 'localization',
      name: 'Rows Per Page Text',
      value: null,
      priority: 5,
    },
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
      priority: 6,
    },
    useAppPageParams: {
      type: 'check',
      group: 'data',
      name: 'Use Application Page Params',
      value: true,
      priority: 7,
    },
    rowsPerPageItems: {
      type: 'input',
      group: 'data',
      name: 'Rows Per Page Items',
      value: null,
      priority: 8,
    },
    rowsPerPage: {
      type: 'input',
      group: 'data',
      name: 'Rows Per Page',
      value: 5,
      priority: 9,
    },
    sortBy: {
      type: 'select',
      group: 'data',
      name: 'Default Sorting By',
      items: '=$activePageElement.dataSource.schema',
      valueProp: ['mapName', 'name'],
      displayProp: ['title', 'name'],
      returnObject: true,
      clearable: true,
      priority: 10,
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
      value: null,
      clearable: true,
      priority: 11,
    },
    theme: {
      group: 'style',
      priority: 12,
    },
    color: {
      group: 'style',
      priority: 13,
    },
    alternatingRows: {
      group: 'style',
      type: 'check',
      name: 'Enable alternating rows',
      value: false,
      priority: 14,
    },
    alternatingRowColor: {
      group: 'style',
      type: 'colorPicker',
      name: 'Alternating row color',
      value: null,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !element.alternatingRows %>'),
      },
      priority: 15,
    },
    headerColor: {
      group: 'style',
      type: 'colorPicker',
      name: 'Header color',
      value: null,
      priority: 16,
    },
  },
};
