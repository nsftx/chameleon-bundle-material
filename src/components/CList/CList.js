import namespace from '@namespace';

const getProps = (context) => {
  const definition = context.definition;

  const props = {
    paginationSync: definition.pagination,
    rowsPerPageItems: definition.rowsPerPageItems,
    items: definition.dataSource.items,
    contentTag: 'v-layout',
  };

  return props;
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
          createElement('v-card-title', props.item.name),
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
    validators: {
      type: Object,
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
