import { map, merge } from 'lodash';
import Element from '../Element';

require('../../style/components/_pagination.scss');

const filterHeader = {
  text: '',
  value: 'filter',
  width: '80px',
  sortable: false,
};

const indexHeader = {
  text: '#',
  value: 'index',
  width: '80px',
  sortable: true,
};

const createHeaderFilter = (context) => {
  const self = context;
  const slot = {
    activator: () => context.$createElement('v-icon', {
      on: {
        click(e) {
          e.preventDefault();
          self.menuState = false;
          self.menuX = e.clientX;
          self.menuY = e.clientY;
          // Using custom event so that I can keep menu opet on header change
          self.$nextTick(() => {
            self.menuState = true;
          });
        },
      },
    }, 'filter_list'),
  };

  const listItem = map(context.config.headers, header => context.$createElement('v-list-item', {
    props: {
      value: header,
      inactive: true,
    },
    on: {
      click() {
        self.menuState = true;
      },
    },
    scopedSlots: {
      default: props => [
        context.$createElement('v-list-item-action', {
        }, [
          context.$createElement('v-checkbox', {
            props: {
              inputValue: props.active,
            },
            on: {
              click() {
                self.menuState = true;
              },
            },
          }),
        ]),
        context.$createElement('v-list-item-title', {}, header.text),
      ],
    },
  }));

  const listSlot = context.$createElement('v-list', {
  }, [
    context.$createElement('v-list-item-group', {
      props: {
        multiple: true,
        value: context.activeHeaders,
      },
      on: {
        change(value) {
          self.active = value;
        },
      },
    },
    [
      listItem,
    ]),
  ]);

  return context.$createElement('v-menu', {
    props: {
      absolute: true,
      offsetY: true,
      closeOnContentClick: false,
      value: context.menuState,
      positionX: context.menuX,
      positionY: context.menuY,
      transition: false,
      minWidth: '195px',
    },
    on: {
      input(value) {
        context.dispatchEvent('menuClicked', { value });
      },
    },
    scopedSlots: slot,
  },
  [
    listSlot,
  ]);
};

const getHeadersProps = (dataSource) => {
  const columns = dataSource.schema;

  return map(columns, column => (merge({
    value: column.mapName || column.name,
    text: column.title || column.name,
    type: column.mapType || column.type,
  })));
};

const setServerPagination = (context, params) => {
  const self = context;

  self.dataSourceParams = merge({
    pagination: params || {
      page: self.config.page,
      size: self.config.itemsPerPage,
      sort: self.config.sort,
      sortBy: self.config.sortBy,
    },
  });
};

const mapClientParams = params => ({
  page: params.page,
  size: params.itemsPerPage,
  sort: params.sortDesc,
  sortBy: params.sortBy,
});


const setTableProps = context => ({
  dark: context.isThemeDark,
  light: context.isThemeLight,
  hideDefaultFooter: true,
  hideDefaultHeader: false,
  headers: context.customHeader,
  headerProps: {
    sortIcon: 'arrow_drop_down',
  },
  items: context.customContent,
  loading: context.config.loading,
  multiSort: context.config.multiSort,
  'options.sync': context.pagination,
  serverItemsLength: context.total || context.serverTotalCount,
  itemsPerPage: context.pagination.size,
  page: context.pagination.page,
});

export default {
  extends: Element,
  data() {
    return {
      active: null,
      menuState: false,
      totalCount: -1,
      serverTotalCount: -1,
      props: {
        page: 1,
      },
    };
  },
  methods: {
    loadData(params) {
      setServerPagination(this, params);

      this.loadConnectorData().then((result) => {
        this.items = result.items || [];
        this.serverTotalCount = (result.pagination && result.pagination.total) || -1;
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
  computed: {
    activeHeaders() {
      const headers = this.dataSource
        ? getHeadersProps(this.dataSource) : (this.config && this.config.headers);
      return this.active || headers;
    },
    customHeader() {
      // Define index and filter header
      return [
        ...(this.config.showIndex ? [indexHeader] : []),
        ...this.activeHeaders,
        ...(this.config.showFilter ? [filterHeader] : []),
      ];
    },
    customContent() {
      const content = this.items && this.items.length ? this.items : this.config.content;
      // Define index and filter column
      return map(content, (item, index) => {
        const newItem = item;
        const pageSize = ((this.pagination.page - 1) * this.pagination.size);
        newItem.index = (index + 1) + pageSize;
        newItem.filter = ' ';
        return newItem;
      });
    },
    isServerRender() {
      return this.total || this.serverItemsLength;
    },
    pagination() {
      return {
        page: this.props.page || this.config.page,
        size: this.props.size || this.config.itemsPerPage,
        sort: this.props.sort || this.config.sort,
        sortBy: this.props.sortBy || this.config.sortBy,
      };
    },
  },
  render() {
    const self = this;
    return this.renderElement('v-data-table', {
      staticClass: 'c-data-table',
      scopedSlots: {
        'header.filter': () => createHeaderFilter(this),
        footer: () => [ // TODO SELECT
          this.$createElement('v-row', {}, [
            this.$createElement('v-col', {
              props: {
                cols: 1,
              },
              staticClass: 'flex-grow-0 flex-shrink-0',
            }, [
              this.$createElement('v-select', {
                props: {
                  outlined: true,
                  height: '32px',
                },
              }),
            ]),
            this.$createElement('v-col', {}, [
              this.$createElement('v-pagination', {
                props: {
                  value: this.pagination.page,
                  length: this.totalCount,
                  totalVisible: 6,
                  nextIcon: 'arrow_forward',
                  prevIcon: 'arrow_back',
                },
                staticClass: 'c-pagination',
                on: {
                  input(value) {
                    self.props.page = value;
                  },
                },
              }),
            ]),
          ]),
        ],
      },
      props: setTableProps(this),
      on: {
        'click:row': (rowItem) => {
          this.dispatchEvent('Selected', rowItem);
        },
        'page-count': (pages) => {
          this.totalCount = pages;
          this.dispatchEvent('PaginationUpdated', this.totalCount);
        },
        'update:options': (value) => {
          merge(this.props, mapClientParams(value));

          if (this.total) {
            this.dispatchEvent('LoadData', this.props);
          } else {
            this.loadData(this.props);
          }
        },
      },
    });
  },
};
