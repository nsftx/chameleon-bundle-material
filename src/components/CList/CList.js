import {
  isNil,
  isString,
  map,
  merge,
  filter,
} from 'lodash';
import Element from '../Element';

require('../../style/components/_list.scss');

const getContainerClasses = () => {
  const attrs = {
    transparent: true,
    fluid: true,
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
    contentTag: 'v-layout',
    contentClass: 'ma-0',
    footerProps: {
      itemsPerPageOptions: getPropRowsPerPageItems(config.rowsPerPageItems),
    },
    itemsPerPage: config.rowsPerPage,
    items: hasDataSource ? context.items : [],
    hideDefaultFooter: config.hideActions,
    'options.sync': context.dataSourceParams.pagination,
    page: config.page,
    serverItemsLength: context.totalItems,
    sortBy: config.sortBy ? config.sortBy.mapName || config.sortBy.name : [],
    sortDesc: config.sort === 'desc',
  };

  const noDataText = context.localize(config.noDataText);
  const rowsPerPageText = context.localize(config.rowsPerPageText);
  if (noDataText) props.noDataText = noDataText;
  if (rowsPerPageText) props.footerProps.itemsPerPageText = rowsPerPageText;

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
      props: {
        dark: context.isThemeDark,
        light: context.isThemeLight,
      },
    },
    [getChildrenItems(createElement, context, item)]),
  ];

  const slot = {
    default: props => createElement('v-row', {
      class: 'no-gutters',
    },
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

const getListHeader = (createElement, context) => {
  let header = null;
  if (context.config.header) {
    header = createElement('v-label', {
      slot: 'header',
    }, context.config.header);
  }
  return header;
};

const mapClientParams = (params, context) => ({
  page: params.page,
  size: params.itemsPerPage,
  sort: context.config.sort, // params.sortDesc[0], // todo
  sortBy: context.config.sortBy, // params.sortBy, // todo
});

const getListComponent = (createElement, context) => createElement('v-data-iterator', {
  attrs: {
    wrap: true,
  },
  props: getProps(context),
  on: {
    'update:page': (value) => {
      context.sendToEventBus('PaginationChanged', value);
    },
    'update:options': (value) => {
      if (context.totalItems > 0) {
        const newParams = mapClientParams(value, context);
        context.loadData(newParams);
      }
    },
  },
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
      totalItems: -1,
    };
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
    const data = {
      class: getContainerClasses(),
      props: {
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
