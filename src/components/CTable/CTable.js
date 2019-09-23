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
      // Vuetify v2 is using default left aligment for number
    /*  case 'number':
    align = 'right';
    break; */
    default:
      align = 'left';
  }

  if (cell.align) ({ align } = cell);

  return {
    align,
    sortable,
  };
};

const getHeadersProp = (dataSource, config) => {
  const columns = dataSource.schema;

  return map(columns, column => (merge({
    value: column.mapName || column.name,
    class: config.headerColor || config.color,
    text: column.title || column.name,
    type: column.mapType || column.type,
  }, getCellInferredProps(column))));
};

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
    loading: context.loadingDataSource,
    items: context.items,
    hideDefaultHeader: !columns || config.hideHeader,
    hideDefaultFooter: config.hideActions,
    headers: columns ? getHeadersProp(dataSource, config) : [],
    itemKey: columns ? keys(columns[0])[0] : 'id',
    itemsPerPage: config.rowsPerPage,
    page: config.page,
    sortBy: config.sortBy ? config.sortBy.mapName || config.sortBy.name : [],
    sortDesc: config.sort === '-',
    serverItemsLength: context.totalItems,
    'options.sync': context.dataSourceParams.pagination,
  };

  const noDataText = context.localize(config.noDataText);
  const itemsPerPageText = context.localize(config.rowsPerPageText);
  if (noDataText) props.noDataText = noDataText;
  if (itemsPerPageText) props.footerProps.itemsPerPageText = itemsPerPageText;

  return props;
};

const setServerPagination = (context, params) => {
  const self = context;

  self.dataSourceParams = merge({
    pagination: params || {
      page: self.config.page,
      size: self.config.rowsPerPage,
      sort: self.config.sort,
      sortBy: self.config.sortBy,
    },
  });
};

const mapClientParams = (params, context) => ({
  page: params.page,
  size: params.itemsPerPage,
  sort: context.config.sort, // params.sortDesc[0], // todo
  sortBy: context.config.sortBy, // params.sortBy, // todo
});

const getScopedSlots = (createElement, context) => {
  const { config } = context;
  const getItemByType = (data) => {
    const child = [];

    each(data.headers, (header) => {
      const item = data.item[header.value];
      switch (header.type) {
        case 'icon':
          child.push(createElement('td', {
            staticClass: `text-${header.align}`,
          }, [
            createElement('v-icon', item),
          ]));
          break;
        case 'image':
          child.push(createElement('td', {
            staticClass: `text-${header.align}`,
          }, [
            createElement('v-avatar', {
              attrs: {
                size: '32px',
              },
            },
            [
              createElement('v-img', {
                attrs: {
                  src: item,
                },
              }),
            ]),
          ]));
          break;
        default:
          child.push(createElement('td', {
            staticClass: `text-${header.align}`,
          }, item));
          break;
      }
    });
    return child;
  };

  const slot = {
    item: (data) => {
      const colorName = !config.alternatingRows ? '' : config.alternatingRowColor || context.colorShade;
      return createElement('tr', {
        staticClass: data.index % 2 === 0 ? colorName : '',
        item: data.item,
      }, [
        getItemByType(data),
      ]);
    },
  };

  return slot;
};

export default {
  extends: Element,
  data() {
    return {
      items: [],
      totalItems: -1,
    };
  },
  computed: {
    colorShade() {
      return this.getColorShade(this.config.color);
    },
  },
  methods: {
    loadData(newParams) {
      setServerPagination(this, newParams);

      this.loadConnectorData().then((result) => {
        this.items = result.items || [];
        this.totalItems = (result.pagination && result.pagination.total) || -1;
        this.sendToEventBus('DataSourceChanged', this.dataSource);
      });
    },
    setRowsPerPage(value) {
      this.config.rowsPerPage = value;
    },
    getColorShade(color) {
      const colorShades = color && color.split(' ');
      if (colorShades && colorShades.length > 1) {
        const shade = colorShades[1].split('-')[0];
        return shade === 'darken' ? `${colorShades[0]} lighten-3` : `${colorShades[0]} darken-3`;
      }
      return null;
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
  render(createElement) {
    return this.renderElement('v-data-table', {
      props: getProps(this),
      staticClass: this.config.color,
      scopedSlots: getScopedSlots(createElement, this),
      on: {
        'click:row': (value) => {
          this.sendToEventBus('SelectedItemChanged', value);
        },
        'update:page': (value) => {
          this.sendToEventBus('PaginationChanged', value);
        },
        'update:options': (value) => {
          if (this.totalItems > 0) {
            const newParams = mapClientParams(value, this);
            this.loadData(newParams);
          }
        },
      },
    });
  },
};
