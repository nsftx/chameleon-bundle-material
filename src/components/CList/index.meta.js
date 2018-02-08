export default {
  group: 'widgets',
  type: 'list',
  name: 'List',
  icon: 'list',
  options: {
    noDataText: {
      type: 'input',
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
    wrap: {
      type: 'check',
      name: 'Horizontal list',
      value: false,
      priority: 6,
    },
    pagination: {
      type: 'subGroup',
      name: 'Pagination',
      rowsPerPage: {
        type: 'input',
        name: 'Rows Per Page',
        value: 5,
      },
      sortBy: {
        type: 'input',
        name: 'Sort items by:',
        value: null,
      },
      descending: {
        type: 'check',
        name: 'Descending',
        value: false,
      },
      page: {
        type: 'input',
        name: 'Start with page:',
        value: 1,
      },
    },
  },
};
