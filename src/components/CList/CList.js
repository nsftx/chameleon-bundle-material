import { defaults, isNil, isString, map } from 'lodash';
import Element from '../Element';

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

const getProps = (context) => {
  const config = context.config;
  const dataSource = context.dataSource;
  const hasDataSource = !isNil(dataSource);

  const props = {
    rowsPerPageItems: getPropRowsPerPageItems(config.rowsPerPageItems),
    hideActions: config.hideActions,
    items: hasDataSource ? context.items : [],
    contentTag: 'v-layout',
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

const getPagination = (config) => {
  const defaultPagination = {
    descending: false,
    sortBy: null,
    rowsPerPage: 10,
    page: 1,
    totalItems: 0,
  };

  const pagination = defaults({
    rowsPerPage: config.rowsPerPage,
    sortBy: config.sortBy,
    descending: config.sortDescending,
    page: config.startPage,
  }, defaultPagination);

  return pagination;
};

const getListAvatar = (createElement, item) => {
  if (item.thumb) {
    return createElement('img', {
      attrs: {
        src: item.thumb,
      },
    });
  }

  return createElement('v-icon', item.icon);
};

const getCardSlot = (createElement, context) => {
  const getChildren = (props) => {
    const item = props.item;

    const listOptions = {
      staticClass: 'transparent',
    };

    return [
      createElement('v-list', listOptions, [
        createElement('v-list-tile', {
          on: {
            click() {
              context.sendToEventBus('SelectedItemChanged', {
                index: props.index,
              });
            },
          },
        },
          [
            createElement('v-list-tile-avatar', [
              getListAvatar(createElement, item),
            ]),
            createElement('v-list-tile-content', [
              createElement('v-list-tile-title', item.title),
              createElement('v-list-tile-sub-title', item.description),
            ]),
          ]),
      ]),
    ];
  };

  const slot = {
    item: props => createElement('v-flex', {
      attrs: {
        xs12: true,
      },
    },
      [
        createElement('v-card', {
          props: {
            color: 'transparent',
            flat: true,
          },
        }, getChildren(props)),
      ],
    ),
  };

  return slot;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    'update:pagination': (value) => {
      if (self.pagination && self.pagination.totalItems && self.dataSourceParams.pagination) {
        self.dataSourceParams.pagination.page = value.page;
        self.loadData();
      }
      self.sendToEventBus('PaginationChanged', value);
      self.pagination = value;
    },
  };

  return listeners;
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
      this.loadConnectorData().then((result) => {
        this.items = result.items || [];
        this.totalItems = result.pagination ? result.pagination.totalResults : 0;
        this.sendToEventBus('DataSourceChanged', this.dataSource);
      });
    },
    setPage(context) {
      if (context.page && this.pagination) {
        this.pagination.page = context.page;
      }
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
    this.pagination = getPagination(this.config);
    this.loadData();
  },
  render(createElement) {
    const children = [
      createElement('v-data-iterator', {
        attrs: {
          name: this.config.name,
          wrap: this.config.wrap,
        },
        class: [
          this.config.color || 'white',
          this.config.flat ? null : 'elevation-1',
        ],
        props: getProps(this),
        scopedSlots: getCardSlot(createElement, this),
        on: getListeners(this),
      }),
    ];

    return this.renderElement('div', {}, children);
  },
};
