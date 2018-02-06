export default {
  group: 'widgets',
  type: 'list',
  name: 'List',
  icon: 'list',
  options: {
    noDataText: {
      name: 'input',
      name: 'No Data Text',
      value: null,
      priority: 1,
    },
    noResultsText: {
      type: 'input',
      name: 'No Results Text',
      value: null,
      priority: 2,
    },
    rowsPerPageText: {
      type: 'input',
      name: 'Rows Per Page Text',
      value: null,
      priority: 3,
    },
    rowsPerPageItems: {
      type: 'input',
      name: 'Rows Per Page Items',
      value: null,
      priority: 4,
    },
    hideActions: {
      type: 'check',
      name: 'Hide Actions',
      value: false,
      priority: 5,
    },
    pagination: {
      type: 'subGroup',
      name: 'Pagiantion',
      rowsPerPage: {
        type: 'input',
        name: 'Rows Per Page',
        value: null,
      },
    },
  },
};
