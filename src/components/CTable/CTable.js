import {
  each, isNil, isString, keys, map, merge, toLower,
} from 'lodash';
import Element from '../Element';
import '../../style/components/_table.scss';

const getPropRowsPerPageItems = (value) => {
  if (!value) {
    return [5, 10, 15, 20];
  } if (isString(value)) {
    if (value.indexOf(',') > -1) {
      return map(value.split(','), Number);
    }

    return [Number(value)];
  }

  return value;
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

  if (cell.align) ({ align } = cell);

  return {
    align,
    sortable,
  };
};

/* const getAlternatingRowColor = (rowParity, context) => {
  const colorClass = context.config.color ? context.config.color.split(' ') : [];
  const colorName = colorClass.length ? colorClass[0] : 'grey';
  let alternatingRowColor = context.config.alternatingRowColor || `${colorName} darken-2`;

  // use darken and lighten classes if alternetingRowColor is not set
  if (colorClass.length > 1 && !context.config.alternatingRowColor) {
    const colorWeight = colorClass[1].split('-')[0] === 'darken' ? 'lighten-3' : 'darken-3';
    alternatingRowColor = `${colorName} ${colorWeight}`;
  }

  return rowParity % 2 === 0 ? alternatingRowColor : `${context.config.color}`;
}; */

/* const setRowColor = (rowIndex, context) => {
  const isAlternatingRowOption = context.config.alternatingRows;

  return isAlternatingRowOption ? getAlternatingRowColor(rowIndex, context) : null;
};

const getSlotContent = (createElement, column, content) => {
  let result = content;
  // Set table column depeneding on mapped or default value type
  const type = column.mapType || column.type;

  if (type === 'icon') {
    result = [createElement('v-icon', content)];
  } else if (type === 'image') {
    result = [
      createElement('v-avatar', {
        attrs: {
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
  }
  return result;
}; */


const getHeadersProp = (dataSource, config) => {
  const columns = dataSource.schema;

  return map(columns, column => (merge({
    value: column.mapName || column.name,
    class: config.headerColor || config.color,
    text: column.title || column.name,
    type: column.mapType || column.type,
  }, getCellInferredProps(column))));
};

/* const getClientPagination = (config, setPagination) => {
  const sort = () => {
    if (config.sortBy) {
      return config.sortBy.mapName ? config.sortBy.mapName : config.sortBy.name;
    }
    return config.sortBy;
  };
  return defaults(setPagination || {}, {
    rowsPerPage: config.rowsPerPage,
    sortBy: sort(),
    sortDesc: config.sort ? config.sort === 'desc' : false,
    page: 1,
  });
}; */

const getProps = (context) => {
  const { config } = context;
  const { dataSource } = context;
  const hasDataSource = !isNil(dataSource);
  const columns = hasDataSource && dataSource.schema;

  const props = {
    dark: context.isThemeDark,
    light: context.isThemeLight,
    footerProps: {
      itemsPerPageOptions: getPropRowsPerPageItems(config.rowsPerPageItems),
    },
    items: context.items,
    hideDefaultHeader: !columns || config.hideHeader,
    hideDefaultFooter: config.hideActions,
    headers: columns ? getHeadersProp(dataSource, config) : [],
    itemKey: columns ? keys(columns[0])[0] : 'id',
    itemsPerPage: config.rowsPerPage,
    page: config.page || 1,
    sortBy: config.sortBy ? config.sortBy.mapName || config.sortBy.name : [],
    sortDesc: config.sort === 'desc',
  };

  // const rowsPerPageText = context.localize(config.rowsPerPageText);
  const noDataText = context.localize(config.noDataText);
  const itemsPerPageText = context.localize(config.rowsPerPageText);


  // if (rowsPerPageText) props.itemsPerPageText = rowsPerPageText;
  if (noDataText) props.noDataText = noDataText;
  if (itemsPerPageText) props.footerProps.itemsPerPageText = itemsPerPageText;
  // if (context.isDataSourceRemoteValid) props.totalItems = context.totalItems;
  // if (context.pagination) props.pagination = context.pagination;

  return props;
};

/* const setDataSourceParams = (context) => {
  const self = context;

  // Remove params set in SDK
  delete self.dataSourceParams.pagination;

  self.dataSourceParams = merge(self.dataSourceParams, {
    pageSize: self.pagination.rowsPerPage,
    sort: self.config.sort,
    sortBy: self.pagination.sortBy ? self.pagination.sortBy.name : self.pagination.sortBy,
  });
}; */

/* const getListeners = (context) => {
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
}; */

const getScopedSlots = (createElement, context) => {
  const headers = getHeadersProp(context.dataSource, context.config);
  let slot = null;
  // Create dynamic slot based on item type (if neccessary add other types)
  each(headers, (header) => {
    switch (header.type) {
      case 'icon':
        slot = {
          [`item.${header.value}`]: props => createElement('v-icon', props.value),
        };
        return slot;
      case 'image':
        slot = {
          [`item.${header.value}`]: props => createElement('v-avatar', {
            attrs: {
              size: '32px',
            },
          },
          [
            createElement('v-img', {
              attrs: {
                src: props.value,
              },
            }),
          ]),
        };
        return slot;
      default:
        return slot;
    }
  });
  return slot;
};

export default {
  extends: Element,
  data() {
    return {
      items: [],
      pagination: null,
      totalItems: null,
    };
  },
  methods: {
    loadData() {
      // setDataSourceParams(this);

      this.loadConnectorData().then((result) => {
        console.log('result ', result);
        this.items = result.items || [];
        this.totalItems = result.pagination ? result.pagination.totalResults : 0;
        this.pagination = result.pagination;
        // this.dataLoaded = true;
        this.sendToEventBus('DataSourceChanged', this.dataSource);
      });
    },
    setRowsPerPage(value) {
      this.config.rowsPerPage = value;
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
    // this.pagination = getClientPagination(this.config);
  },
  render(createElement) {
    return this.renderElement('v-data-table', {
      props: getProps(this),
      staticClass: this.config.color,
      // on: getListeners(this),
      scopedSlots: getScopedSlots(createElement, this),
      on: {
        'click:row': (value, index) => {
          this.sendToEventBus('SelectedItemChanged', value);
        },
        'update:page': (value) => {
          this.sendToEventBus('PaginationChanged', value);
        },
        touchend(evt) {
          // Stopping this event, otherwise reaching table horizontal scroll end
          // on mobile affects other components such as tabs
          evt.stopPropagation();
        },
      },
    });
  },
};
