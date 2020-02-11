import { map } from 'lodash';
import Element from '../Element';

require('../../style/components/_pagination.scss');

// FOOTER NUMBER OF ITEMS
// SLOT INSTED OF ITEM OR ITEM + SLOT FOR TAGS AND AVATARS
// ------------------------------

// TODO create seperate component
const createHeaderFilter = (context) => {
  const slot = {
    activator: (props) => {
      const { on } = props;
      return context.$createElement('v-icon', {
        on,
      }, 'filter_list');
    },
  };

  const listItem = map(context.config.headers, (header, index) => context.$createElement('v-list-item', {
    props: {
      key: index,
      value: header,
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
                props.toggle();
              },
            },
          }),
        ]),
        context.$createElement('v-list-item-title', {}, header.text),
      ],
    },
  }));

  const listSlot = context.$createElement('v-list', {
    props: {
      value: context.activeHeaders,
    },
  }, [
    context.$createElement('v-list-item-group', {
      props: {
        multiple: true,
        value: context.activeHeaders,
        activeClass: '',
      },
      on: {
        change(value) {
          const self = context;
          self.activeHeaders = value;
        },
      },
    },
    [
      listItem,
    ]),
  ]);

  return context.$createElement('v-menu', {
    props: {
      offsetY: true,
      closeOnClick: false,
      closeOnContentClick: false,
    },
    on: {
      click(value) {
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
      page: 1,
      pageCount: 10,
      activeHeaders: [],
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
    customHeader() {
      // Define index header
      if (this.config.showIndex) {
        return [
          ...[{
            text: '#',
            value: 'index',
          }],
          ...this.activeHeaders,
          ...[{
            text: '',
            value: 'filter',
            sortable: false,
          }],
        ];
      }
      return [...this.activeHeaders,
        ...[{
          text: '',
          value: 'filter',
          sortable: false,
        }],
      ];
    },
    customContent() {
      // Define index column
      if (this.config.showIndex) {
        return map(this.config.content, (item, index) => {
          const newItem = item;
          newItem.index = index + 1;
          return newItem;
        });
      }
      return this.config.content;
    },
  },
  beforeMount() {
    if (this.config && this.config.headers) {
      this.activeHeaders = this.config.headers;
    }
  },
  render() {
    return this.renderElement('v-data-table', {
      staticClass: 'c-data-table',
      scopedSlots: {
        'header.filter': () => createHeaderFilter(this),
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
        item: props => this.$createElement('tr', {}, [
          map(this.customHeader, header => this.$createElement('td', {
            staticStyle: {
              width: header.value === 'filter' ? '10px' : '',
            },
          }, props.item[header.value])),
        ]),
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
