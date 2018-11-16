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

const data = [
  {
    id: 1,
    display: 'Applications :',
    items: [
      { id: 2, display: 'Calendar : app' },
      { id: 3, display: 'Chrome : app' },
      { id: 4, display: 'Webstorm : app' },
    ],
  },
  {
    id: 5,
    display: 'Documents :',
    items: [
      {
        id: 6,
        display: 'vuetify :',
        items: [
          {
            id: 7,
            display: 'src :',
            items: [
              { id: 8, display: 'index : ts' },
              { id: 9, display: 'bootstrap : ts' },
            ],
          },
        ],
      },
      {
        id: 10,
        display: 'material2 :',
        items: [
          {
            id: 11,
            display: 'src :',
            items: [
              { id: 12, display: 'v-btn : ts' },
              { id: 13, display: 'v-card : ts' },
              { id: 14, display: 'v-window : ts' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 15,
    display: 'Downloads :',
  },
  {
    id: 19,
    display: 'Videos :',
    items: [
      {
        id: 20,
        display: 'Tutorials :',
        items: [
          { id: 21, display: 'Basic layouts : mp4' },
          { id: 22, display: 'Advanced techniques : mp4' },
          { id: 23, display: 'All about app : dir' },
        ],
      },
      { id: 24, display: 'Intro : mov' },
      { id: 25, display: 'Conference introduction : avi' },
    ],
  },
];

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
  };
};

const getListeners = (context) => {
  const self = context;
  return {
    input(value) {
      self.value = value;
      self.$emit('input', value);
    },
  };
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
    // Label is not slot we can't change it's value
    // append
  };
  return slot;
};

export default {
  extends: Element,
  data() {
    return {
      items: [],
      open: [],
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
          // HACK since openAll is only working on component load
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
        this.items = result.items || data;
        this.sendToEventBus('DataSourceChanged', this.dataSource);
      });
    },
    async getChildren(item) {
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
    return this.renderElement(
      'v-treeview',
      {
        props: getProps(this),
        on: getListeners(this),
        staticClass: this.config.color,
        scopedSlots: getTreeSlot(createElement, this),
      },
    );
  },
};
