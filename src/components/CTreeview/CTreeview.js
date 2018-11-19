import {
  each,
  filter,
  isArray,
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
    activeClass: 'grey lighten-4',
    multipleActive: true,
    dark: context.isThemeDark,
    light: context.isThemeLight,
    items: context.items, // dataSource
    itemKey: context.itemValue,
    itemText: context.itemDisplay,
    itemChildren: context.itemChildren,
    loadChildren: context.getChildren,
    open: context.open,
    selectable: config.selection !== 'none',
    selectedColor: config.selectorColor,
    openAll: context.openOnLoad, // Vuetify wtf!?
    openOnClick: true,
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
        console.log('value ', JSON.stringify(value));
        // self.value.shift();
      }
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
    // Label - it is not slot, so we can't change it's value
    // https://github.com/vuetifyjs/vuetify/pull/5567
  };
  return slot;
};

export default {
  extends: Element,
  data() {
    return {
      items: [],
      open: [],
      value: [],
    };
  },
  computed: {
    allItems() {
      if (this.items.length) {
        return this.getAllItems();
      }
      return null;
    },
    firstItem() {
      if (this.items.length) {
        const first = filter(this.items, item => item[this.itemChildren]);
        return first[0] || null;
      }
      return null;
    },
    itemChildren() {
      if (this.items.length) {
        // User-defined key
        const itemChildren = this.config.itemChildren;
        if (!isNil(itemChildren) && !isEmpty(itemChildren)) {
          return itemChildren;
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
      if (this.items.length) {
        // User-defined key
        const itemValue = this.config.itemValue;
        if (!isNil(itemValue) && !isEmpty(itemValue)) {
          return itemValue;
          // Predefined 'id' key
        } else if (!isNil(this.items[0].id)) {
          return 'id';
        }
      }
      return null;
    },
    itemDisplay() {
      if (this.items.length) {
        // User-defined key
        const itemDisplay = this.config.itemDisplay;
        if (!isNil(itemDisplay) && !isEmpty(itemDisplay)) {
          return itemDisplay;
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
      let openState = false;
      this.open = [];
      switch (this.config.defaultState) {
        case 'first':
          if (this.items.length > 0) {
            this.open.push(this.firstItem[this.itemValue]);
          }
          openState = false;
          break;
        case 'all':
          // Since openAll is only working on component load
          // set open value trought array (this.open) of item id's
          if (this.items.length > 0) {
            this.open = this.allItems;
          }
          openState = true;
          break;
        default:
          openState = false;
      }
      return openState;
    },
    schemaType() {
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
    getMapType() {
      const type = filter(this.schemaType, (schema) => {
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
    loadData() {
      this.loadConnectorData().then((result) => {
        this.items = result.items || [];
        this.sendToEventBus('DataSourceChanged', this.dataSource);
      });
    },
    async getChildren(item) {
      // We have this error https://github.com/vuetifyjs/vuetify/issues/5550
      const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

      await pause(1500);
      const test = {
        id: 333,
        name: 'Applications 2 :',
      };
      item[this.itemChildren].push(test);
    },
  },
  watch: {
    dataSource: {
      handler() {
        this.loadData();
      },
      deep: true,
    },
  },
  render(createElement) {
    if (!this.items.length && this.registry.isPreviewMode) {
      return renderPlaceholder(createElement, this);
    }
    return this.renderElement(
      'v-treeview',
      {
        props: getProps(this),
        on: getListeners(this),
        staticClass: `${this.config.color} ${this.togglePosition} ${this.checkPosition}`,
        scopedSlots: getTreeSlot(createElement, this),
      },
    );
  },
};
