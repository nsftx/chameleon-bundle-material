import { isNil, filter } from 'lodash';
import { validator } from '@validators';
import CSelect from '../CSelect/CSelect';

const getAvatar = (createElement, data) => {
  if (data.item.thumb) {
    return createElement('img', {
      attrs: {
        src: data.item.thumb,
      },
    });
  }
  return createElement('v-icon', data.item.icon);
};

const getCardSlot = (createElement, context) => {
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
          getAvatar(createElement, data),
        ]),
        data.item[context.config.itemText],
      ],
    ),
    item: data => [
      createElement('v-list-tile-avatar',
        [
          getAvatar(createElement, data),
        ],
      ),
      createElement('v-list-tile-content', [
        createElement('v-list-tile-title',
          data.item[context.config.itemText]),
        createElement('v-list-tile-sub-title',
          data.item.description),
      ]),
    ],
  };

  return slot;
};

const getPropAppendIcon = config => config.appendIcon || 'arrow_drop_down';

const getPropRequired = (config) => {
  if (!isNil(config.validation)) {
    return !!config.validation.required;
  }

  return false;
};

const setItemProps = (context) => {
  const self = context;
  const data = self.config.dataSource;
  if (!isNil(data) && !isNil(data.items) && data.items.length > 0) {
    const mapProps = filter(data.items, i => !isNil(i.mapName));
    const itemProps = Object.keys(data.items[0]);
    self.config.itemValue = !mapProps.length ? itemProps[0] : 'value';
    self.config.itemText = !mapProps.length ? itemProps[1] : 'text';
  }
};
const getProps = (context) => {
  const config = context.config;
  setItemProps(context);

  const props = {
    appendIcon: getPropAppendIcon(config),
    chips: context.chips,
    clearable: config.clearable && !config.readonly,
    deletableChips: context.chips && !config.readonly,
    hint: config.hint,
    items: config.dataSource ? config.dataSource.items : [],
    label: config.label,
    loading: false,
    itemValue: config.itemValue,
    itemText: config.itemText,
    multiLine: config.multiLine,
    multiple: config.multiple,
    openOnClear: config.clearable,
    persistentHint: config.persistentHint,
    placeholder: config.placeholder,
    prependIcon: config.prependIcon,
    readonly: config.readonly,
    disabled: config.disabled,
    required: getPropRequired(config),
    rules: validator.getRules(config, context.validators),
    returnObject: true,
    value: config.value,
  };
  return props;
};

export default {
  extends: CSelect,
  data() {
    return {
      chips: true,
    };
  },
  render(createElement) {
    const children = createElement(
      'v-select',
      {
        props: getProps(this),
        attrs: this.selectAttr,
        on: this.selectListeners,
        scopedSlots: getCardSlot(createElement, this),
      },
    );

    return this.renderElement('div', {}, children);
  },
};
