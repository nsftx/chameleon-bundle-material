import {
  VDataTable,
  VCheckbox,
  VList,
  VListItem,
  VListItemTitle,
  VListItemAction,
  VListItemGroup,
  VIcon,
  VMenu,
  VPagination,
} from 'vuetify/lib';
import Table from './CTable';

export default {
  install(Vue, options) {
    const name = options && options.namespace
      ? `${options.namespace}-table` : 'c-table';

    Vue.component(name, {
      name,
      components: {
        VDataTable,
        VCheckbox,
        VList,
        VListItem,
        VListItemTitle,
        VListItemAction,
        VListItemGroup,
        VIcon,
        VMenu,
        VPagination,
      },
      extends: Table,
      props: {
        content: {
          type: Array,
          default: () => [],
        },
        headers: {
          type: Array,
          default: () => [],
        },
        itemsPerPage: {
          type: Number,
          default: 10,
        },
        loading: {
          type: Boolean,
          default: false,
        },
        page: {
          type: Number,
          default: 1,
        },
        showIndex: {
          type: Boolean,
          default: true,
        },
        showFilter: {
          type: Boolean,
          default: true,
        },
        sort: {
          type: String,
          default: '+',
        },
        sortBy: {
          type: String,
          default: null,
        },
        total: {
          type: Number,
          default: -1,
        },
      },
    });
  },
};
