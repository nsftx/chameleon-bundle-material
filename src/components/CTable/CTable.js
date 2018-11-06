import { defaults, each, isNil, isString, keys, map, merge, toLower } from 'lodash';
import Element from '../Element';
import '../../style/components/_table.styl';

const getPropRowsPerPageItems = (value) => {
  if (!value) {
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
    name: context.config.name,
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

const getAlternatingRowColor = (rowParity, context) => {
  const colorClass = context.config.color ? context.config.color.split(' ') : [];
  const colorName = colorClass.length ? colorClass[0] : 'grey';
  let alternatingRowColor = context.config.alternetingRowColor || `${colorName} darken-2`;

  // use darken and lighten classes if alternetingRowColor is not set
  if (colorClass.length > 1 && !context.config.alternetingRowColor) {
    const colorWeight = colorClass[1].split('-')[0] === 'darken' ? 'lighten-3' : 'darken-3';
    alternatingRowColor = `${colorName} ${colorWeight}`;
  }

  return rowParity % 2 === 0 ? alternatingRowColor : `${context.config.color}`;
};

const setRowColor = (rowIndex, context) => {
  const isAlternetingRowOption = context.config.alternetingRows;
  // eslint-disable-next-line
  return isAlternetingRowOption ? getAlternatingRowColor(rowIndex, context) : null;
};

const getScopedSlots = (createElement, context) => {
  const dataSource = context.dataSource;
  const getColumns = (props) => {
    const item = props.item;
    const columns = [];

    each(dataSource.schema, (schemaItem) => {
      const contentProp = isNil(schemaItem.mapName) ? 'name' : 'mapName';

      let content = item[schemaItem[contentProp]];
      const inferredProps = {};

      const column = schemaItem;
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
              }, [
                createElement('img', {
                  attrs: {
                    src: content,
                  },
                }),
              ]),
            ];
            break;
          default:
            content = item[schemaItem[contentProp]];
        }
      }

      columns.push(createElement('td', {
        staticClass: `text-xs-${inferredProps.align}`,
      }, content));
    });

    return columns;
  };


  const slot = {
    items: props => createElement('tr', {
      staticClass: setRowColor(props.index, context),
      on: {
        click() {
          const item = props.item;
          context.sendToEventBus('SelectedItemChanged', item);
        },
      },
    }, getColumns(props)),
  };

  return slot;
};

const getHeadersProp = (dataSource, config) => {
  const columns = dataSource.schema;

  return map(columns, column => (merge({
    value: column.name,
    class: config.headerColor || config.color,
    text: column.title || column.name,
  }, getCellInferredProps(column))));
};

const getClientPagination = (config, setPagination) => defaults(setPagination || {}, {
  rowsPerPage: config.rowsPerPage,
  sortBy: config.sortBy,
  descending: config.sort ? config.sort === 'desc' : null,
  page: config.startPage,
});

const getProps = (context) => {
  const config = context.config;
  const dataSource = context.dataSource;
  const hasDataSource = !isNil(dataSource);
  const columns = hasDataSource && dataSource.schema;

  const props = {
    dark: context.isThemeDark,
    light: context.isThemeLight,
    items: context.items,
    hideHeaders: !columns,
    headers: columns ? getHeadersProp(dataSource, config) : [],
    itemKey: columns ? keys(columns[0])[0] : 'id',
    loading: context.loadingDataSource,
    mustSort: false,
    rowsPerPageItems: getPropRowsPerPageItems(config.rowsPerPageItems),
  };

  const rowsPerPageText = context.localize(config.rowsPerPageText);
  const noResultsText = context.localize(config.noResultsText);
  const noDataText = context.localize(config.noDataText);

  if (rowsPerPageText) props.rowsPerPageText = rowsPerPageText;
  if (noResultsText) props.noResultsText = noResultsText;
  if (noDataText) props.noDataText = noDataText;
  if (context.isDataSourceRemoteValid) props.totalItems = context.totalItems;
  if (context.pagination) props.pagination = context.pagination;

  return props;
};

const setDataSourceParams = (context) => {
  const self = context;

  // Remove params set in SDK
  delete self.dataSourceParams.pagination;

  self.dataSourceParams = merge(self.dataSourceParams, {
    pageSize: self.pagination.rowsPerPage,
    sort: self.pagination.descending ? 'desc' : 'asc',
    sortBy: self.pagination.sortBy,
    currentPage: self.pagination.page,
  });
};

const getListeners = (context) => {
  const self = context;

  return {
    'update:pagination': (value) => {
      if (self.pagination && self.dataLoaded) {
        self.pagination = getClientPagination(self.config, value);
        self.loadData();
        self.sendToEventBus('PaginationChanged', value);
      }
    },
  };
};

export default {
  extends: Element,
  data() {
    return {
      items: [],
      pagination: null,
      totalItems: null,
      dataLoaded: false,
    };
  },
  methods: {
    loadData() {
      setDataSourceParams(this);

      this.loadConnectorData().then((result) => {
        this.items = result.items || [];
        this.totalItems = result.pagination ? result.pagination.totalResults : 0;
        this.dataLoaded = true;
        this.sendToEventBus('DataSourceChanged', this.dataSource);
      });
    },
    setPage() {
      // todo
    },
    setRowsPerPage(context) {
      if (context.rows && this.pagination) {
        this.pagination.rowsPerPage = context.rows;
      }
    },
  },
  watch: {
    dataSource: {
      handler() {
        this.loadData();
      },
      deep: true,
    },
  },
  mounted() {
    this.pagination = getClientPagination(this.config);
    this.loadData();
  },
  render(createElement) {
    const table = createElement('v-data-table', {
      attrs: getAttrs(this),
      props: getProps(this),
      on: getListeners(this),
      scopedSlots: getScopedSlots(createElement, this),
    });

    return this.renderElement(
      'v-card',
      {
        props: {
          flat: this.config.flat,
          color: this.config.color,
        },
      },
      table,
    );
  },
};
