import CSelect from '../CSelect/CSelect';

const getDeletableChipSlot = (createElement, context) => {
  const slot = {
    selection: data => createElement(
      'v-chip',
      {
        attrs: { tabindex: '-1' },
        key: JSON.stringify(data.item),
        staticClass: 'chip--select-multi',
        on: {
          input: () => data.parent.selectItem(data.item),
        },
        props: {
          close: true,
          selected: data.selected,
        },
      },
      data.item[context.selectProps.itemText],
    ),
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
    const children = createElement(
      'v-select',
      {
        attrs: this.attrs,
        props: this.selectProps,
        on: this.listeners,
        scopedSlots: deletableChips && getDeletableChipSlot(createElement, this),
      },
    );

    return this.renderElement('div', {}, children);
  },
};
