import namespace from '@namespace';
import { each, isNil, keys, map, merge } from 'lodash';
import { localizable } from '@mixins';

const getAttrs = (context) => {
  const attrs = {
    name: context.definition.name,
  };

  return attrs;
};

const getScopedSlots = (createElement, dataSource) => {
  const getColumns = (props) => {
    const item = props.item;
    const columns = [];

    each(keys(item), (key) => {
      let content = item[key];
      if (dataSource && dataSource.columns) {
        const column = dataSource.columns[key];
        if (column) {
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

      columns.push(createElement('td', {}, content));
    });

    return columns;
  };

  const slot = {
    items: props => createElement('tr', {}, getColumns(props)),
  };

  return slot;
};

const getCellInferredProps = (column) => {
  let align = column.align;

  if (!align) {
    switch (column.type) {
      case 'date':
      case 'icon':
      case 'image':
        align = 'center';
        break;
      case 'number':
        align = 'right';
        break;
      default:
        align = 'left';
    }
  }

  return {
    align,
  };
};

const getHeadersProp = (dataSource) => {
  const columns = dataSource.columns;
  return map(columns, column => (merge({
    value: column.name,
    text: column.title,
  }, getCellInferredProps(column))));
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
    const dataSource = this.definition.dataSource;

    return createElement(
      'v-data-table',
      {
        attrs: getAttrs(this),
        props: getProps(this),
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
