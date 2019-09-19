import {
  defaults,
  isNil,
  isString,
  map,
  merge,
  filter,
} from 'lodash';
import Element from '../Element';

require('../../style/components/_list.scss');

const getContainerClasses = (context) => {
  const { config } = context;
  const attrs = {
    transparent: true,
    fluid: config.fluid,
    wrap: true,
    container: true,
  };

  return attrs;
};

const getPropRowsPerPageItems = (value) => {
  if (isNil(value)) {
    return [5, 10, 15, 20];
  } if (isString(value)) {
    if (value.indexOf(',') > -1) {
      return map(value.split(','), Number);
    }

    return [Number(value)];
  }

  return value;
};

const getProps = (context) => {
  const { config } = context;
  const { dataSource } = context;
  const hasDataSource = !isNil(dataSource);

  const props = {
    footerProps: {
      itemsPerPageOptions: getPropRowsPerPageItems(config.rowsPerPageItems),
    },
    hideDefaultFooter: config.hideActions,
    itemsPerPage: config.rowsPerPage,
    items: hasDataSource ? context.items : [],
    sortBy: config.sortBy ? config.sortBy.mapName || config.sortBy.name : [],
    sortDesc: config.sort === 'desc',
    contentTag: 'v-layout',
    contentClass: 'ma-0',
  };

  const rowsPerPageText = context.localize(config.rowsPerPageText);
  const noDataText = context.localize(config.noDataText);

  if (rowsPerPageText) props.footerProps.itemsPerPageText = rowsPerPageText;
  if (noDataText) props.noDataText = noDataText;
  if (context.isDataSourceRemoteValid) props.totalItems = context.totalItems;
  if (context.pagination) props.pagination = context.pagination;

  return props;
};

const getListAvatar = (createElement, item, context) => {
  if (!item.thumb && !item.icon) {
    return null;
  }
  const children = () => {
    if (item.thumb) {
      return createElement('img', {
        attrs: {
          src: item.thumb,
        },
      });
    }
    return createElement('v-icon', item.icon);
  };
  return createElement('v-list-item-avatar', {
    props: {
      tile: !context.config.imageRadius,
    },
  }, [children()]);
};

const getChildrenItems = (createElement, context, item) => {
  const mapProps = context.dataSource.schema
    ? filter(context.dataSource.schema, i => !isNil(i.mapName)) : {};
  const itemProps = Object.keys(item);
  const title = !mapProps.length ? item[itemProps[0]] : item.title;
  const description = !mapProps.length ? item[itemProps[1]] : item.description;

  return createElement('v-list-item', {
    on: {
      click() {
        context.sendToEventBus('SelectedItemChanged', item);
      },
    },
  },
  [
    getListAvatar(createElement, item, context),
    createElement('v-list-item-content', {
      class: { overflow: context.config.showOverflow },
    },
    [
      createElement('v-list-item-title', {
        class: `c-list-title ${context.config.titleColor}`,
        style: {
          height: item.label ? 'inherit' : 0,
          borderRadius: context.config.titleRadius ? '5px' : 0,
        },
      }, item.label),
      createElement('v-list-item-title', title),
      createElement('v-list-item-subtitle', item.subtitle),
      createElement('v-list-item-subtitle', {
        class: 'c-list-description',
      }, description),
    ]),
  ]);
};

const getCardSlot = (createElement, context) => {
  const getChildren = item => [
    createElement('v-list', {
      class: {
        [context.config.color]: true,
      },
    },
    [getChildrenItems(createElement, context, item)]),
  ];

  const slot = {
    default: props => createElement('v-row', {},
      [
        map(props.items, item => createElement('v-col', {
          props: {
            key: item.name,
            cols: '12',
            sm: context.config.noOfRows,
          },
        }, [
          createElement('v-card', {
            style: {
              borderRadius: context.config.itemRadius ? '5px' : 0,
            },
            staticClass: [`pa-${context.config.spacing}`],
            props: {
              flat: true,
            },
          }, getChildren(item)),
        ])),
      ]),
  };

  return slot;
};

const getClientPagination = (config, setPagination) => {
  const sort = () => {
    if (config.sortBy) {
      return config.sortBy.mapName ? config.sortBy.mapName : config.sortBy.name;
    }
    return config.sortBy;
  };
  return defaults(setPagination || {}, {
    itemsPerPage: config.rowsPerPage,
    sortBy: sort(),
    descending: config.sort ? config.sort === 'desc' : null,
    page: 1,
  });
};

/* const getListeners = (context) => {
  const self = context;

  const listeners = {
    'update:pagination': (value) => {
      self.pagination = getClientPagination(self.config, value);
      self.loadData();
      self.sendToEventBus('PaginationChanged', value);
    },
  };

  return listeners;
}; */

const getListHeader = (createElement, context) => {
  let header = null;
  if (context.config.header) {
    header = createElement('v-label', {
      slot: 'header',
    }, context.config.header);
  }
  return header;
};

const getListComponent = (createElement, context) => createElement('v-data-iterator', {
  attrs: {
    wrap: true,
  },
  props: getProps(context),
  // on: getListeners(context),
  scopedSlots: getCardSlot(createElement, context),
},
[
  getListHeader(createElement, context),
]);

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
      // Remove params set in SDK
      delete this.dataSourceParams.pagination;
      // Set server pagination
      this.dataSourceParams = merge(this.dataSourceParams, {
        pageSize: this.pagination.rowsPerPage,
        sort: this.pagination.descending ? 'desc' : 'asc',
        sortBy: this.pagination.sortBy ? this.pagination.sortBy.name : this.pagination.sortBy,
      });
      this.loadConnectorData().then((result) => {
        this.items = result.items || [];
        this.totalItems = result.pagination ? result.pagination.totalResults : 0;
        this.sendToEventBus('DataSourceChanged', this.dataSource);
      });
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
  },
  render(createElement) {
    const data = {
      class: getContainerClasses(this),
      props: {
        dark: this.isThemeDark,
        light: this.isThemeLight,
        flat: this.config.flat,
      },
    };

    const list = getListComponent(createElement, this);

    return this.renderElement(
      'v-card',
      data,
      [list],
    );
  },
};
