import { VDataTable, VPagination } from 'vuetify/lib';
import Table from './CTable';

export default {
  install(Vue, options) {
    const name = options && options.namespace
      ? `${options.namespace}-table` : 'c-table';

    Vue.component(name, {
      name,
      components: {
        VDataTable,
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
        showIndex: {
          type: Boolean,
          default: true,
        },
      },
    });
  },
};
