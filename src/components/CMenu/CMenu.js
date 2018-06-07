import { each } from 'lodash';
import Element from '../Element';

export default {
  extends: Element,
  data() {
    return {
      isVisible: true,
      items: [],
    };
  },
  computed: {
    isAbsolute() {
      return !this.isFixed;
    },
    isFixed() {
      return this.config.main;
    },
    isMini() {
      return this.config.layout === 'mini';
    },
    isLeft() {
      return !this.isRight;
    },
    isRight() {
      return this.config.position === 'right';
    },
    positionType() {
      return this.config.positionType;
    },
  },
  methods: {
    loadData() {
      this.loadConnectorData().then((result) => {
        this.items = result.items || [];
        this.sendToEventBus('DataSourceChanged', this.dataSource);
      });
    },
    selectItem(item) {
      this.sendToEventBus('SelectedItemChanged', item);
    },
  },
  watch: {
    dataSource() {
      if (!this.config.autoGenerate) {
        this.loadData();
      }
    },
  },
  mounted() {
    if (this.config.autoGenerate) {
      // TODO: Generate from $app.pages
      console.log(this.getBindingValue('=$app.pages'));
    } else {
      this.loadData();
    }
  },
  render(createElement) {
    const context = this;

    const listItems = [];
    each(this.items, (item) => {
      const listItem = createElement(
        'v-list-tile',
        {
          on: {
            click() {
              context.selectItem(item);
            },
          },
        },
        [
          createElement('v-list-tile-action', [
            createElement('v-icon', item.icon),
          ]),
        ],
      );

      listItems.push(listItem);
    });

    const list = createElement('v-list', {
      props: {
        dense: true,
      },
    }, listItems);

    return this.renderElement('v-navigation-drawer', {
      key: this.schema.uid,
      class: this.getBindingValue(this.config.color),
      props: {
        absolute: this.isAbsolute,
        app: this.config.main,
        dark: this.isThemeDark,
        disableRouteWatcher: true,
        fixed: this.isFixed,
        height: this.config.height,
        left: this.isLeft,
        light: this.isThemeLight,
        miniVariant: this.isMini,
        right: this.isRight,
        value: this.isVisible,
        width: this.config.width,
      },
    }, list);
  },
};
