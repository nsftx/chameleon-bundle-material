import { defaults, isNil, isString, map } from 'lodash';
import { elementable, localizable, reactionable, sourceable } from '@mixins';

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
  const definition = context.definition;
  const dataSource = context.dataSource;
  const hasDataSource = !isNil(dataSource);

  const props = {
    rowsPerPageItems: getPropRowsPerPageItems(definition.rowsPerPageItems),
    hideActions: definition.hideActions,
    items: hasDataSource ? context.items : [],
    contentTag: 'v-layout',
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

const getCardSlot = (createElement) => {
  const getChildren = (props) => {
    const item = props.item;

    const listOptions = {
      staticClass: 'transparent',
    };

    return [
      createElement('v-list', listOptions, [
        createElement('v-list-tile', [
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
    reactionable,
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
        this.items = result.items || [];
        this.totalItems = result.pagination ? result.pagination.totalResults : 0;
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
  mounted() {
    this.pagination = getPagination(this.definition);
    this.loadData();
  },
  render(createElement) {
    const children = [
      createElement(
        'v-data-iterator',
        {
          attrs: {
            name: this.definition.name,
            wrap: this.definition.wrap,
          },
          class: [
            this.definition.color || 'white',
            this.definition.flat ? null : 'elevation-1',
          ],
          props: getProps(this),
          scopedSlots: getCardSlot(createElement),
          on: getListeners(this),
        },
      ),
    ];

    return createElement('div', {
      attrs: this.getSchemaAttributes(),
      staticClass: `${this.baseClass} ${this.$options.name}`,
    }, children);
  },
};
