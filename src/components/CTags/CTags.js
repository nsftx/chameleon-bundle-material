import namespace from '@namespace';
import CSelect from '../CSelect/CSelect';

const getDeletableChipSlot = (createElement, displayProp) => {
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
      data.item[displayProp],
    ),
  };

  return slot;
};

export default {
  name: `${namespace}tags`,
  extends: CSelect,
  data() {
    return {
      chips: true,
    };
  },
  render(createElement) {
    const deletableChips = this.selectProps.deletableChips;
    const displayProp = this.selectProps.itemText;

    const children = [
      createElement(
        'v-select',
        {
          attrs: this.attrs,
          props: this.selectProps,
          on: this.listeners,
          scopedSlots: deletableChips && getDeletableChipSlot(createElement, displayProp),
        },
      ),
    ];

    return createElement('div', {
      attrs: this.getSchemaAttributes(),
      staticClass: `${this.baseClass} ${this.$options.name}`,
    }, children);
  },
};
