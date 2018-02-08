import namespace from '@namespace';
import { isNil, isString, map, merge } from 'lodash';

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

  const props = {
    rowsPerPageItems: getPropRowsPerPageItems(definition.rowsPerPageItems),
    rowsPerPageText: definition.rowsPerPageText,
    noResultsText: definition.noResultsText,
    noDataText: definition.noDataText,
    hideActions: definition.hideActions,
    items: definition.dataSource.items,
    contentTag: 'v-layout',
  };

  return props;
};

const getListAvatar = (createElement, data) => {
  if (data.item.thumb) {
    return createElement('img', {
      attrs: {
        src: data.item.thumb,
      },
    });
  }
  return createElement('v-icon', data.item.icon);
};

const getCardSlot = (createElement) => {
  const slot = {
    item: props => createElement('v-flex', {
      attrs: {
        xs12: true,
      },
    },
      [
        createElement('v-card', [
          createElement('v-list', [
            createElement('v-list-tile', [
              createElement('v-list-tile-avatar',
                [
                  getListAvatar(createElement, props),
                ]),
              createElement('v-list-tile-content', [
                createElement('v-list-tile-title',
                  props.item.title),
                createElement('v-list-tile-sub-title',
                  props.item.description),
              ]),
            ]),
          ]),
        ]),
      ],
    ),
  };

  return slot;
};

const getListeners = (context) => {
  const self = context;

  const listeners = {
    'update:pagination': (value) => {
      const pagination = merge(value, self.definition.pagination);
      self.$emit('update:pagination', pagination);
    },
  };

  return listeners;
};

export default {
  name: `${namespace}list`,
  props: {
    definition: {
      type: Object,
      required: true,
    },
  },
  render(createElement) {
    return createElement(
      'v-data-iterator',
      {
        attrs: {
          name: this.definition.name,
          wrap: this.definition.wrap,
        },
        props: getProps(this),
        scopedSlots: getCardSlot(createElement),
        on: getListeners(this),
      },
    );
  },
};
