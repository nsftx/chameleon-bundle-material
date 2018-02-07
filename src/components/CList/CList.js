import namespace from '@namespace';

const getProps = (context) => {
  const definition = context.definition;

  const props = {
    paginationSync: definition.pagination,
    rowsPerPageItems: definition.rowsPerPageItems,
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
      },
    );
  },
};
