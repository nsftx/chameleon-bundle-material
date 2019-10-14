import { isNil, find } from 'lodash';
import { binding } from '@/utility';

const expressionImport = {
  imports: {
    isNil,
    find,
  },
};

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
      name: 'setRowsPerPage',
      help: 'Set itemsPerPage from event data',
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
    hideHeader: {
      type: 'check',
      name: 'Hide Header',
      value: false,
      priority: 2,
    },
    hideActions: {
      type: 'check',
      name: 'Hide Actions',
      value: false,
      priority: 3,
    },
    noDataText: {
      type: 'input',
      group: 'localization',
      name: 'No Data Text',
      value: null,
      priority: 1,
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
    page: {
      type: 'number',
      group: 'data',
      name: 'Start With Page',
      value: 1,
      priority: 6,
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
      priority: 8,
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
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= isNil(element.dataSource) %>', expressionImport),
      },
      value: {
        current: null,
        default: null,
        expression: binding.setExpression('<%= isNil(find(element.dataSource.schema, { id: element.sortBy.id })) ? null : element.sortBy.id %>', expressionImport),
      },
      priority: 10,
    },
    sort: {
      type: 'select',
      group: 'data',
      name: 'Default Sorting',
      items: [
        {
          name: 'Ascending',
          value: '+',
        },
        {
          name: 'Descending',
          value: '-',
        },
      ],
      value: null,
      clearable: true,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= isNil(element.dataSource) %>', expressionImport),
      },
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
      name: 'Enable Alternating Rows',
      value: false,
      priority: 14,
    },
    alternatingRowColor: {
      group: 'style',
      type: 'colorPicker',
      name: 'Alternating Row Color',
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
      name: 'Header Color',
      value: null,
      priority: 16,
    },
  },
};
