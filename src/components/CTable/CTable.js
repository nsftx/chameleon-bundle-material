import namespace from '@namespace';
import { each, isNil, keys, map } from 'lodash';
import { localizable } from '@mixins';

const getAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
  };

  return attrs;
};

const getScopedSlots = (createElement) => {
  const getColumns = (props) => {
    const item = props.item;
    const columns = [];

    each(keys(item), (key) => {
      columns.push(createElement('td', {}, item[key]));
    });

    return columns;
  };

  const slot = {
    items: props => createElement('tr', {}, getColumns(props)),
  };

  return slot;
};

const getHeadersProp = (dataSource) => {
  const columns = dataSource.columns;
  return map(columns, column => ({
    value: column.name,
    text: column.title,
  }));
};

const getProps = (context) => {
  const definition = context.definition;
  const hasDataSource = !isNil(definition.dataSource);

  const props = {
    items: hasDataSource ? definition.dataSource.items : [],
    headers: hasDataSource ? getHeadersProp(definition.dataSource) : [],
    itemKey: hasDataSource ? keys(definition.dataSource.columns[0])[0] : 'id',
  };

  const rowsPerPageText = context.localize(definition.rowsPerPageText);
  const noResultsText = context.localize(definition.noResultsText);
  const noDataText = context.localize(definition.noDataText);

  if (rowsPerPageText) props.rowsPerPageText = rowsPerPageText;
  if (noResultsText) props.noResultsText = noResultsText;
  if (noDataText) props.noDataText = noDataText;

  return props;
};

export default {
  name: `${namespace}table`,
  mixins: [
    localizable,
  ],
  props: {
    definition: {
      type: Object,
      required: true,
    },
  },
  render(createElement) {
    return createElement(
      'v-data-table',
      {
        attrs: getAttrs(this),
        props: getProps(this),
        scopedSlots: getScopedSlots(createElement),
        staticClass: this.$options.name,
        class: [
          this.definition.color || 'white',
          this.definition.flat ? null : 'elevation-1',
        ],
      },
    );
  },
};
