import { map } from 'lodash';
import Element from '../Element';

require('../../style/components/_pagination.scss');

// FOOTER NUMBER OF ITEMS
// SLOT INSTED OF ITEM OR ITEM + SLOT FOR TAGS AND AVATARS
// ------------------------------

// TODO create seperate component
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

const setTableProps = (context) => {
  const { config } = context;
  return {
    hideDefaultFooter: true,
    hideDefaultHeader: false,
    headers: context.customHeader,
    headerProps: {
      sortIcon: 'arrow_drop_down',
    },
    items: context.customContent,
    itemsPerPage: config.itemsPerPage,
    page: context.page,
  };
};

export default {
  extends: Element,
  data() {
    return {
      active: null,
      page: 1,
      pageCount: 10,
      menuState: false,
      filter: {
        text: '',
        value: 'filter',
        width: '80px',
        sortable: false,
      },
      index: {
        text: '#',
        value: 'index',
        width: '80px',
        sortable: true,
      },
    };
  },
  methods: {
    // TODO do we need this since element has the same functionality?
    loadData() {
      this.loadConnectorData().then((result) => {
        this.items = result.items || [];
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
      return this.active || (this.config && this.config.headers);
    },
    customHeader() {
      // Define index header
      return [
        ...(this.config.showIndex ? [this.index] : []),
        ...this.activeHeaders,
        ...(this.config.showFilter ? [this.filter] : []),
      ];
    },
    customContent() {
      // Define index column
      return map(this.config.content, (item, index) => {
        const newItem = item;
        newItem.index = index + 1;
        newItem.filter = ' ';
        return newItem;
      });
    },
  },
  render() {
    return this.renderElement('v-data-table', {
      staticClass: 'c-data-table',
      scopedSlots: {
        'header.filter': () => createHeaderFilter(this),
        /* header: ({ props }) => this.$createElement('thead', {}, [
          this.$createElement('tr', {}, [
            map(props.headers, header => this.$createElement('td', {
            }, header.text)),
            this.$createElement('td', {
              staticStyle: {
                width: '10px',
              },
            }, [createHeaderFilter(this)]),
          ]),
        ]), */
        footer: () => this.$createElement('v-pagination', {
          props: {
            value: this.page,
            length: this.pageCount,
            nextIcon: 'arrow_forward',
            prevIcon: 'arrow_back',
          },
          staticClass: 'c-pagination',
          on: {
            input: (data) => {
              // emits number of pages
              this.page = data;
            },
          },
        }),
        /* item: props => this.$createElement('tr', {}, [
          map(this.customHeader, header => this.$createElement('td',
            {}, props.item[header.value])), */
        // ]),
      },
      props: setTableProps(this),
      on: {
        'click:row': (rowItem) => {
          this.dispatchEvent('Selected', rowItem);
        },
        'page-count': (pages) => {
          // Set dynimic page count
          this.pageCount = pages;
        },
      },
    });
  },
};
