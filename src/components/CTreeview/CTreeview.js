import {
  each,
  filter,
  isArray,
  isEmpty,
  isNil,
  isObject,
  sortBy,
} from 'lodash';
import Element from '../Element';
import '../../style/components/_treeview.styl';

const data = [
  {
    id: 1,
    name: 'Applications :',
    items: [
      { id: 2, name: 'Calendar : app' },
      { id: 3, name: 'Chrome : app' },
      { id: 4, name: 'Webstorm : app' },
    ],
  },
  {
    id: 5,
    name: 'Documents :',
    items: [
      {
        id: 6,
        name: 'vuetify :',
        items: [
          {
            id: 7,
            name: 'src :',
            items: [
              { id: 8, name: 'index : ts' },
              { id: 9, name: 'bootstrap : ts' },
            ],
          },
        ],
      },
      {
        id: 10,
        name: 'material2 :',
        items: [
          {
            id: 11,
            name: 'src :',
            items: [
              { id: 12, name: 'v-btn : ts' },
              { id: 13, name: 'v-card : ts' },
              { id: 14, name: 'v-window : ts' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 15,
    name: 'Downloads :',
  },
  {
    id: 19,
    name: 'Videos :',
    items: [
      {
        id: 20,
        name: 'Tutorials :',
        items: [
          { id: 21, name: 'Basic layouts : mp4' },
          { id: 22, name: 'Advanced techniques : mp4' },
          { id: 23, name: 'All about app : dir' },
        ],
      },
      { id: 24, name: 'Intro : mov' },
      { id: 25, name: 'Conference introduction : avi' },
    ],
  },
];

const getProps = (context) => {
  const config = context.config;

  return {
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
          },
        });
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
