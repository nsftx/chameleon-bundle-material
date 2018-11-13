import Element from '../Element';

const items = [
  {
    id: 1,
    name: 'Applications :',
    children: [
      { id: 2, name: 'Calendar : app' },
      { id: 3, name: 'Chrome : app' },
      { id: 4, name: 'Webstorm : app' },
    ],
  },
  {
    id: 5,
    name: 'Documents :',
    children: [
      {
        id: 6,
        name: 'vuetify :',
        children: [
          {
            id: 7,
            name: 'src :',
            children: [
              { id: 8, name: 'index : ts' },
              { id: 9, name: 'bootstrap : ts' },
            ],
          },
        ],
      },
      {
        id: 10,
        name: 'material2 :',
        children: [
          {
            id: 11,
            name: 'src :',
            children: [
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
    children: [
      { id: 16, name: 'October : pdf' },
      { id: 17, name: 'November : pdf' },
      { id: 18, name: 'Tutorial : html' },
    ],
  },
  {
    id: 19,
    name: 'Videos :',
    children: [
      {
        id: 20,
        name: 'Tutorials :',
        children: [
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
    color: config.style ? config.style.color : null,
    items: context.items, // dataSource
    itemKey: config.data.itemValue,
    itemText: config.data.itemDisplay,
    itemChildren: config.data.itemChildren,
  };
};

const getListeners = (context) => {
  const self = context;
  return {
    input(value) {
      self.value = value;
      console.log('event input value ', value);
      self.$emit('input', value);
    },
  };
};

export default {
  extends: Element,
  data() {
    return {
      items: [],
    };
  },
  props: {
    itemChildren: {
      type: String,
      default: 'children',
    },
    itemDisplay: {
      type: String,
      default: 'name',
    },
    itemValue: {
      type: String,
      default: 'id',
    },
  },
  methods: {
    loadData() {
      this.loadConnectorData().then(() => {
        // this.items = result.items || [];
        this.sendToEventBus('DataSourceChanged', this.dataSource);
      });
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
  mounted() {
    // this.loadData();
    // TODO remove this
    this.items = items;
  },
  render() {
    return this.renderElement(
      'v-treeview',
      {
        props: getProps(this),
        on: getListeners(this),
      },
    );
  },
};
