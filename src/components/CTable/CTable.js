import namespace from '@namespace';
import { each, isNil, isString, keys, map, merge } from 'lodash';
import { localizable } from '@mixins';

require('../../style/components/_table.styl');

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

const getAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
  };

  return attrs;
};

const getCellInferredProps = (cell) => {
  let align;
  let sortable = true;

  switch (cell.type) {
    case 'date':
      align = 'center';
      break;
    case 'icon':
    case 'image':
      align = 'center';
      sortable = false;
      break;
    case 'number':
      align = 'right';
      break;
    default:
      align = 'left';
  }

  if (cell.align) align = cell.align;

  return {
    align,
    sortable,
  };
};

const getScopedSlots = (createElement, dataSource) => {
  const getColumns = (props) => {
    const item = props.item;
    const columns = [];

    each(keys(item), (key) => {
      let content = item[key];
      const inferredProps = {};

      if (dataSource && dataSource.columns) {
        const column = dataSource.columns[key];
        if (column) {
          merge(inferredProps, getCellInferredProps(column));

          switch (column.type) {
            case 'icon':
              content = [createElement('v-icon', content)];
              break;
            case 'image':
              content = [
                createElement('v-avatar', {
                  attrs: {
                    // NOTE: Expose in options?
                    size: '32px',
                  },
                },
                  [
                    createElement('img', {
                      attrs: {
                        src: content,
                      },
                    }),
                  ]),
              ];
              break;
            default:
              content = item[key];
          }
        }
      }

      columns.push(createElement('td', {
        staticClass: `text-xs-${inferredProps.align}`,
      }, content));
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

  return map(columns, column => (merge({
    value: column.name,
    text: column.title || column.name,
  }, getCellInferredProps(column))));
};

const getProps = (context) => {
  const definition = context.definition;
  const dataSource = definition.dataSource;
  const hasDataSource = !isNil(dataSource);
  const hasColumns = hasDataSource && dataSource.columns;

  const props = {
    items: hasDataSource ? definition.dataSource.items : [],
    hideHeaders: !hasColumns,
    headers: hasColumns ? getHeadersProp(dataSource) : [],
    itemKey: hasColumns ? keys(dataSource.columns[0])[0] : 'id',
    rowsPerPageItems: getPropRowsPerPageItems(definition.rowsPerPageItems),
  };

  const rowsPerPageText = context.localize(definition.rowsPerPageText);
  const noResultsText = context.localize(definition.noResultsText);
  const noDataText = context.localize(definition.noDataText);

  if (rowsPerPageText) props.rowsPerPageText = rowsPerPageText;
  if (noResultsText) props.noResultsText = noResultsText;
  if (noDataText) props.noDataText = noDataText;

  return props;
};

const getListeners = (context) => {
  const listeners = {
    'update:pagination': (value) => {
      const options = context.definition;
      const pagination = merge(value, {
        rowsPerPage: options.rowsPerPage,
        sortBy: options.sortBy,
        descending: options.sortDescending,
        page: options.startPage,
      });

      context.$emit('update:pagination', pagination);
    },
  };

  return listeners;
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
    const dataSource = this.definition.dataSource;

    return createElement(
      'v-data-table',
      {
        attrs: getAttrs(this),
        props: getProps(this),
        on: getListeners(this),
        scopedSlots: getScopedSlots(createElement, dataSource),
        staticClass: this.$options.name,
        class: [
          this.definition.color || 'white',
          this.definition.flat ? null : 'elevation-1',
        ],
      },
    );
  },
};
