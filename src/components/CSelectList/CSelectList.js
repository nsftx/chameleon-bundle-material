import { isEmpty, isNil, filter } from 'lodash';
import { validator } from '@/validators';
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

const setItemProps = (context, item) => {
  const self = context;
  const data = self.config.dataSource;
  const mapProps = data && data.schema ? filter(data.schema, i => !isNil(i.mapName)) : [];
  const itemProps = Object.keys(item);
  self.config.itemValue = !mapProps.length ? itemProps[0] : 'value';
  self.config.itemText = String(!mapProps.length ? itemProps[1] || itemProps[0] : 'text');
};

const getCardSlot = (createElement, context) => {
  const slot = {
    selection: (data) => {
      setItemProps(context, data.item);
      return createElement('v-chip',
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
        ]);
    },
    item: (data) => {
      setItemProps(context, data.item);
      return [
        createElement('v-list-item-avatar',
          [
            getAvatar(createElement, data),
          ]),
        createElement('v-list-item-content', [
          createElement('v-list-item-title',
            data.item[context.config.itemText]),
          createElement('v-list-item-subtitle',
            data.item.description),
        ]),
      ];
    },
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

const getProps = (context) => {
  const { config } = context;
  const isDark = !isEmpty(config.theme) ? config.theme === 'dark' : context.$parent.$attrs.theme === 'dark';

  const props = {
    appendIcon: getPropAppendIcon(config),
    chips: context.chips,
    clearable: config.clearable && !config.readonly,
    deletableChips: context.chips && !config.readonly,
    dark: isDark,
    hint: config.hint,
    items: context.items || [],
    label: config.label,
    loading: false,
    itemValue: config.itemValue,
    itemText: config.itemText,
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
  // Menu should inherit theme from its parent (select or form), not app theme
  if (isDark) props.menuProps = 'dark';
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
