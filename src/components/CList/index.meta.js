import { isNil, find } from 'lodash';
import { binding } from '@/utility';

const expressionImport = {
  imports: {
    isNil,
    find,
  },
};

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
  {
    name: 'header',
    type: 'String',
    label: 'Header',
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
      ignoreOwnEvents: [
        'DataSourceChanged',
      ],
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
      priority: 1,
    },
    noOfRows: {
      type: 'select',
      name: 'Grid Type',
      group: 'style',
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
      priority: 1,
    },
    color: {
      value: null,
      group: 'style',
      priority: 3,
    },
    theme: {
      value: null,
      group: 'style',
      priority: 2,
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
      priority: 8,
    },
    itemRadius: {
      type: 'check',
      group: 'style',
      name: 'Item Radius',
      value: true,
      priority: 7,
    },
    titleRadius: {
      type: 'check',
      group: 'style',
      name: 'Title Background Radius',
      value: true,
      priority: 6,
    },
    titleColor: {
      type: 'colorPicker',
      group: 'style',
      name: 'Title Background Color',
      value: 'green accent-4',
      priority: 4,
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
      priority: 5,
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
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
      schema: itemInterface,
      priority: 1,
    },
    header: {
      type: 'input',
      group: 'data',
      name: 'Header',
      value: null,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.dataSource) && !isNil(find(element.dataSource.schema, { mapName: "header"})) %>', expressionImport),
      },
      priority: 2,
    },
    page: {
      type: 'number',
      group: 'data',
      name: 'Start With Page',
      value: 1,
      priority: 3,
    },
    rowsPerPageItems: {
      type: 'input',
      group: 'data',
      name: 'Rows Per Page Items',
      value: null,
      priority: 4,
    },
    rowsPerPage: {
      type: 'number',
      group: 'data',
      name: 'Rows Per Page',
      value: 5,
      priority: 5,
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
        expression: binding.setExpression('<%= isNil(find(element.dataSource.schema, { id: element.sortBy.id })) %>', expressionImport),
      },
      priority: 6,
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
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= isNil(element.dataSource) %>', expressionImport),
      },
      priority: 7,
    },
  },
};
