import CSelect from '../CSelect/CSelect';

const getChipAvatar = (createElement, data) => {
  if (data.item.thumb) {
    return createElement('img', {
      attrs: {
        src: data.item.thumb,
      },
    });
  }
  return createElement('v-icon', data.item.icon);
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
    selection: data => createElement('v-chip',
      {
        staticClass: 'chip--select-multi',
        on: {
          input: () => data.parent.selectItem(data.item),
        },
        props: {
          close: true,
          selected: data.selected,
        },
      },
      [
        createElement('v-avatar', [
          getChipAvatar(createElement, data),
        ]),
      ],
    ),
    item: data => [
      createElement('v-list-tile-avatar',
        [
          getListAvatar(createElement, data),
        ],
      ),
      createElement('v-list-tile-content', [
        createElement('v-list-tile-title',
          data.item.name),
        createElement('v-list-tile-sub-title',
          data.item.description),
      ]),
    ],
  };

  return slot;
};

export default {
  name: 'c-select-list',
  extends: CSelect,
  data() {
    return {
      chips: true,
    };
  },
  render(createElement) {
    return createElement(
      'v-select',
      {
        attrs: this.attrs,
        props: this.selectProps,
        scopedSlots: this.selectProps.deletableChips &&
          getCardSlot(createElement, this.selectProps.itemText),
        on: this.listeners,
      },
    );
  },
};
