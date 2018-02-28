import namespace from '@namespace';
import { isNil, isString, map, merge } from 'lodash';
import { elementable, localizable } from '@mixins';

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
  const hasDataSource = !isNil(definition.dataSource);

  const props = {
    rowsPerPageItems: getPropRowsPerPageItems(definition.rowsPerPageItems),
    hideActions: definition.hideActions,
    items: hasDataSource ? definition.dataSource.items : [],
    contentTag: 'v-layout',
  };

  const rowsPerPageText = context.localize(definition.rowsPerPageText);
  const noResultsText = context.localize(definition.noResultsText);
  const noDataText = context.localize(definition.noDataText);

  if (rowsPerPageText) props.rowsPerPageText = rowsPerPageText;
  if (noResultsText) props.noResultsText = noResultsText;
  if (noDataText) props.noDataText = noDataText;

  return props;
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
  name: `${namespace}list`,
  mixins: [
    elementable,
    localizable,
  ],
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
