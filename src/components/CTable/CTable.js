import { defaults, each, isNil, isString, keys, map, merge, toLower } from 'lodash';
import { elementable, localizable, sourceable } from '@mixins';
import '../../style/components/_table.styl';

const getPropRowsPerPageItems = (value) => {
  if (isNil(value)) {
    return [5, 10, 15, 20];
  } else if (isString(value)) {
    if (value.indexOf(',') > -1) {
      return map(value.split(','), Number);
    }

    return [Number(value)];
  }

  return value;
};

const getAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
  };

  return attrs;
};

const getCellInferredProps = (cell) => {
  let align;
  let sortable = true;

  switch (toLower(cell.type)) {
    case 'date':
      align = 'center';
      break;
    case 'icon':
    case 'image':
      align = 'center';
      sortable = false;
      break;
    case 'number':
      align = 'right';
      break;
    default:
      align = 'left';
  }

  if (cell.align) align = cell.align;

  return {
    align,
    sortable,
  };
};

const getScopedSlots = (createElement, dataSource) => {
  const getColumns = (props) => {
    const item = props.item;
    const columns = [];

    each(keys(item), (key) => {
      let content = item[key];
      const inferredProps = {};

      if (dataSource && dataSource.schema) {
        const column = dataSource.schema[key];
        if (column) {
          merge(inferredProps, getCellInferredProps(column));

          switch (toLower(column.type)) {
            case 'icon':
              content = [createElement('v-icon', content)];
              break;
            case 'image':
              content = [
                createElement('v-avatar', {
                  attrs: {
                    // NOTE: Expose in options?
                    size: '32px',
                  },
                },
                  [
                    createElement('img', {
                      attrs: {
                        src: content,
                      },
                    }),
                  ]),
              ];
              break;
            default:
              content = item[key];
          }
        }
      }

      columns.push(createElement('td', {
        staticClass: `text-xs-${inferredProps.align}`,
      }, content));
    });

    return columns;
  };

  const slot = {
    items: props => createElement('tr', {}, getColumns(props)),
  };

  return slot;
};

const getHeadersProp = (dataSource) => {
  const columns = dataSource.schema;

  return map(columns, column => (merge({
    value: column.name,
    text: column.title || column.name,
  }, getCellInferredProps(column))));
};

const getPagination = (definition) => {
  const defaultPagination = {
    descending: false,
    sortBy: null,
    rowsPerPage: 10,
    page: 1,
    totalItems: 0,
  };

  const pagination = defaults({
    rowsPerPage: definition.rowsPerPage,
    sortBy: definition.sortBy,
    descending: definition.sortDescending,
    page: definition.startPage,
  }, defaultPagination);

  return pagination;
};

const getProps = (context) => {
  const definition = context.definition;
  const dataSource = context.dataSource;
  const hasDataSource = !isNil(dataSource);
  const columns = hasDataSource && dataSource.schema;

  const props = {
    items: context.items,
    hideHeaders: !columns,
    headers: columns ? getHeadersProp(dataSource) : [],
    itemKey: columns ? keys(columns[0])[0] : 'id',
    loading: context.loadingDataSource,
    rowsPerPageItems: getPropRowsPerPageItems(definition.rowsPerPageItems),
  };

  const rowsPerPageText = context.localize(definition.rowsPerPageText);
  const noResultsText = context.localize(definition.noResultsText);
  const noDataText = context.localize(definition.noDataText);

  if (rowsPerPageText) props.rowsPerPageText = rowsPerPageText;
  if (noResultsText) props.noResultsText = noResultsText;
  if (noDataText) props.noDataText = noDataText;
  if (context.isDataSourceRemoteValid) props.totalItems = context.totalItems;
  if (context.pagination) props.pagination = context.pagination;

  return props;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    'update:pagination': (value) => {
      /*
      Weird solution but since we are changing paging this
      gets triggered a lot of times since we do not have
      sync modifier.
      */
      if (self.pagination && self.pagination.totalItems && self.dataSourceParams.pagination) {
        self.dataSourceParams.pagination.page = value.page;
        self.loadData();
      }

      self.pagination = value;
    },
  };

  return listeners;
};

export default {
  mixins: [
    elementable,
    localizable,
    sourceable,
  ],
  data() {
    return {
      items: [],
      pagination: null,
      totalItems: null,
    };
  },
  methods: {
    loadData() {
      this.loadConnectorData().then((result) => {
        this.items = result.items;
        this.totalItems = result.pagination.totalResults;
      });
    },
  },
  mounted() {
    this.pagination = getPagination(this.definition);
    this.loadData();
  },
  render(createElement) {
    const children = [
      createElement(
        'v-data-table',
        {
          attrs: getAttrs(this),
          props: getProps(this),
          on: getListeners(this),
          scopedSlots: getScopedSlots(createElement, this.dataSource),
          class: [
            this.definition.color || 'white',
            this.definition.flat ? null : 'elevation-1',
          ],
        },
      ),
    ];

    return createElement('div', {
      attrs: this.getSchemaAttributes(),
      staticClass: `${this.baseClass} ${this.$options.name}`,
    }, children);
  },
};
