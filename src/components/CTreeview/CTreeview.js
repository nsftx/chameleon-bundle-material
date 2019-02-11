import {
  each,
  filter,
  isArray,
  isEqual,
  isEmpty,
  isString,
  isNil,
  isObject,
  sortBy,
} from 'lodash';
import Element from '../Element';
import '../../style/components/_treeview.styl';

const getProps = (context) => {
  const config = context.config;

  return {
    activatable: true,
    activeClass: config.activeClass || 'grey lighten-4',
    multipleActive: true,
    active: context.active,
    dark: context.isThemeDark,
    filter: context.filter,
    light: context.isThemeLight,
    items: context.items,
    itemKey: context.itemValue,
    itemText: context.itemDisplay,
    itemChildren: context.itemChildren,
    loadChildren: context.getChildren,
    selectable: config.selection !== 'none',
    selectedColor: config.selectorColor,
    search: context.search,
    open: context.open,
    openAll: context.openOnLoad,
    openOnClick: true,
    returnObject: true, // Maybe expose in option if necessary,
    value: context.value,
  };
};

const getListeners = (context) => {
  const self = context;
  return {
    input(value) {
      self.value = value;
      // TODO enable single select, currently value gets sorted on 'input'
      // so it's not possible to tell which item was added last one
      if (self.config.selection === 'single' && value.length > 1) {
        // TODO self.value.shift();
      }
      context.sendToEventBus('SelectionChanged', value);
    },
    'update:active': (value) => {
      context.sendToEventBus('ActiveItemChanged', value);
    },
    'update:open': (value) => {
      // Don't remove this if you don't wanna fall into the loop
      if (!isEqual(self.open, value)) {
        self.open = value;
      }
      context.sendToEventBus('StateChanged', value);
    },
  };
};

const renderPlaceholder = (createElement, context) => {
  const icon = createElement(
    'v-icon',
    {
      props: { xLarge: true },
    },
    'list_alt',
  );

  return context.renderElement('v-card', {
    props: {
      flat: true,
    },
  }, [icon]);
};

const renderFilterSlot = (createElement, context) => {
  const self = context;
  return createElement(
    'v-text-field', {
      props: {
        backgroundColor: self.config.color,
        clearable: true,
        clearIcon: 'add_circle_outline',
        color: self.config.filterColor,
        flat: true,
        fullWidth: true,
        hideDetails: true,
        label: self.config.filterText,
        value: self.search,
      },
      on: {
        input(value) {
          self.search = value;
        },
      },
    });
};

const getTreeSlot = (createElement, context) => {
  const slot = {
    prepend: (items) => {
      if (context.getMapType() === 'image') {
        return createElement('c-image', {
          props: {
            definition: {
              width: '100px',
              height: '100px',
              src: items.item[context.itemDisplay],
            },
            unselectable: true,
          },
        });
      }
      if (context.getMapType() === 'icon') {
        return createElement('v-icon', {}, items.item[context.itemDisplay]);
      }
      return null;
    },
    label: (items) => {
      if (context.getMapType() === 'image') {
        return null;
      }
      return items.item[context.itemDisplay];
    },
  };
  return slot;
};

const renderTreeView = (createElement, context, method) => {
  const render = method ? context.renderElement : createElement;
  return render(
    'v-treeview',
    {
      props: getProps(context),
      on: getListeners(context),
      staticClass: `${context.config.color} ${context.togglePosition} ${context.checkPosition}`,
      scopedSlots: getTreeSlot(createElement, context),
    },
  );
};

const checkIfValid = (context, value) => {
  const status = filter(context.items, item => !isNil(item[value]));
  return status.length;
};

export default {
  extends: Element,
  data() {
    return {
      active: [],
      open: [],
      value: [],
      search: null,
    };
  },
  computed: {
    allItems() {
      if (!isNil(this.items) && this.items.length) {
        return this.getAllItems();
      }
      return null;
    },
    filter() {
      return (item, search, text) => {
        const itemText = item[text].toLowerCase();
        return itemText.indexOf(search.toLowerCase()) > -1;
      };
    },
    firstItem() {
      if (!isNil(this.items) && this.items.length) {
        const first = filter(this.items, item => item[this.itemChildren]);
        return first[0] || null;
      }
      return null;
    },
    itemChildren() {
      if (!isNil(this.items) && this.items.length) {
        // User-defined key
        const itemChildren = this.config.itemChildren;
        if (!isNil(itemChildren) && !isEmpty(itemChildren)) {
          if (checkIfValid(this, itemChildren)) return itemChildren;
          // Predefined 'children' key
        } else if (!isNil(this.items[0].children)) {
          return 'children';
        }
        // Find first array key
        let firstChild = null;
        const filtered = item => each(item, (value, key) => {
          if (isArray(value)) {
            firstChild = key;
          }
          if (isObject(value) && isNil(firstChild)) filtered(value);
        });
        filtered(this.items);
        return firstChild;
      }
      return null;
    },
    itemValue() {
      if (!isNil(this.items) && this.items.length) {
        // User-defined key
        const itemValue = this.config.itemValue;
        if (!isNil(itemValue) && !isEmpty(itemValue)) {
          if (checkIfValid(this, itemValue)) return itemValue;
          // Predefined 'id' key
        } else if (!isNil(this.items[0].id)) {
          return 'id';
        }
        let level = 0;
        const searchTree = (items) => {
          each(items, (child) => {
            level += 1;
            this.$set(child, 'id', level);
            if (child[this.itemChildren] && child[this.itemChildren].length > 0) {
              searchTree(child[this.itemChildren]);
            }
          });
        };
        searchTree(this.items);
        return 'id';
      }
      return null;
    },
    itemDisplay() {
      if (!isNil(this.items) && this.items.length) {
        // User-defined key
        const itemDisplay = this.config.itemDisplay;
        if (!isNil(itemDisplay) && !isEmpty(itemDisplay)) {
          if (checkIfValid(this, itemDisplay)) return itemDisplay;
          // Predefined 'name' key
        } else if (!isNil(this.items[0].name)) {
          return 'name';
        }
        // Find first string key
        let firstChild = null;
        const filtered = item => each(item, (value, key) => {
          if (isString(value)) {
            firstChild = key;
          }
          if (isObject(value) && isNil(firstChild)) filtered(value);
        });
        filtered(this.items);
        return firstChild;
      }
      return null;
    },
    openOnLoad() {
      if (isNil(this.items)) return false;
      if (this.config.defaultState === 'all') return true;
      return false;
    },
    dataSourceSchema() {
      if (this.dataSource) return this.dataSource.schema;
      return null;
    },
    togglePosition() {
      return this.config.expanderPosition === 'right' ? 'c-right-toggle' : '';
    },
    checkPosition() {
      return this.config.selectorPosition === 'right' ? 'c-right-check' : '';
    },
  },
  methods: {
    addItem(source, id) {
      const item = this.getItemById(id);
      item.items = source;
    },
    getMapType() {
      const type = filter(this.dataSourceSchema, (schema) => {
        const name = schema.mapName || schema.name;
        return name === this.itemDisplay;
      });
      return type.length ? type[0].mapType : null;
    },
    // Get all children id's (open state is controlled by this)
    getAllItems() {
      const leafs = [];
      const searchTree = (items) => {
        each(items, (child) => {
          if (child[this.itemChildren] && child[this.itemChildren].length > 0) {
            searchTree(child[this.itemChildren]);
          }
          if (child[this.itemValue]) leafs.push(child[this.itemValue]);
        });
      };
      searchTree(this.items);
      return sortBy(leafs);
    },
    getItemById(id) {
      let item = null;
      const searchTree = (items) => {
        each(items, (child) => {
          if (child[this.itemValue] === id) item = child;
          if (child[this.itemChildren] && child[this.itemChildren].length > 0) {
            searchTree(child[this.itemChildren]);
          }
        });
      };
      searchTree(this.items);
      return item;
    },
    async getChildren(item) {
      const connector = this.options.connector;
      const id = this.dataSource.connector.id;
      const type = this.options.connectors[id];

      if (connector) {
        connector.getSourceData(type, this.dataSource).then((result) => {
          if (result && item) {
            // Can't add directly to item
            // this.addItem(result, item[this.itemValue]);
          }
        }).catch(() => {
          this.sendToEventBus('GetAsyncChildren', item);
        });
      } else {
        this.sendToEventBus('GetAsyncChildren', item);
      }
    },
    setState(state) {
      // Array of id's
      this.open = state;
      this.sendToEventBus('StateChanged', this.open);
    },
    setSelection(selection) {
      // Array of id's
      this.value = selection;
      this.sendToEventBus('SelectionChanged', this.value);
    },
    setActiveItem(active) {
      // Array of id's
      this.active = active;
      this.sendToEventBus('ActiveItemChanged', this.active);
    },
  },
  watch: {
    dataSource: {
      handler() {
        this.loadData().then(() => {
          if (!isNil(this.items)) {
            this.open.push(this.firstItem[this.itemValue]);
          }
        });
      },
      deep: true,
    },
  },
  render(createElement) {
    const filterSlot = renderFilterSlot(createElement, this);
    const treeViewSlot = renderTreeView(createElement, this);
    if (isNil(this.items)) {
      return renderPlaceholder(createElement, this);
    }
    if (this.config.filter) {
      return this.renderElement('v-card', {
        props: {
          flat: true,
          dark: this.isThemeDark,
          light: this.isThemeLight,
        },
        class: 'mx-auto',
      }, [filterSlot, treeViewSlot]);
    }
    return renderTreeView(createElement, this, true);
  },
};
