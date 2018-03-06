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
        data.item.name,
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
  extends: CSelect,
  data() {
    return {
      chips: true,
    };
  },
  render(createElement) {
    const deletableChips = this.selectProps.deletableChips;

    const children = [
      createElement(
        'v-select',
        {
          attrs: this.attrs,
          props: this.selectProps,
          on: this.listeners,
          scopedSlots: deletableChips && getCardSlot(createElement, this.selectProps.itemText),
        },
      ),
    ];

    return createElement('div', {
      attrs: this.getSchemaAttributes(),
      staticClass: `${this.baseClass} ${this.$options.name}`,
    }, children);
  },
};
