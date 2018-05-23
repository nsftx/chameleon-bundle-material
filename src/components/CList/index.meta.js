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
    },
    {
      name: 'PaginationChanged',
      help: 'Fires when table page gets changed',
    },
  ],
  options: {
    color: {
      type: 'input',
      name: 'Color',
      value: null,
      priority: 1,
    },
    flat: {
      type: 'check',
      name: 'No Shadow',
      value: false,
      priority: 2,
    },
    hideActions: {
      type: 'check',
      name: 'Hide Actions',
      value: false,
      priority: 3,
    },
    wrap: {
      type: 'check',
      name: 'Stacked Items',
      value: true,
      priority: 4,
    },
    noDataText: {
      type: 'input',
      group: 'localization',
      name: 'No Data Text',
      value: null,
      priority: 5,
    },
    noResultsText: {
      type: 'input',
      group: 'localization',
      name: 'No Results Text',
      value: null,
      priority: 6,
    },
    rowsPerPageText: {
      type: 'input',
      group: 'localization',
      name: 'Rows Per Page Text',
      value: null,
      priority: 7,
    },
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
      priority: 8,
    },
    rowsPerPageItems: {
      type: 'input',
      group: 'data',
      name: 'Rows Per Page Items',
      value: null,
      priority: 9,
    },
    rowsPerPage: {
      type: 'input',
      group: 'data',
      name: 'Rows Per Page',
      value: 5,
      priority: 10,
    },
    startPage: {
      type: 'input',
      group: 'data',
      name: 'Start With Page',
      value: 1,
      priority: 11,
    },
    sortBy: {
      type: 'input',
      group: 'data',
      name: 'Sort Items By',
      value: null,
      priority: 12,
    },
    sortDescending: {
      type: 'check',
      group: 'data',
      name: 'Sort Descending',
      value: false,
      priority: 13,
    },
    theme: true,
  },
};
