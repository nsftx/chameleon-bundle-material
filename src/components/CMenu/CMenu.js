import { each, map, snakeCase } from 'lodash';
import Element from '../Element';
import '../../style/components/_menu.styl';

export default {
  extends: Element,
  data() {
    return {
      isVisible: true,
      items: [],
    };
  },
  computed: {
    autoGenerate() {
      return this.config.autoGenerate;
    },
    height() {
      return this.isFixed ? '100%' : this.config.height;
    },
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
    setItemsOrLoad() {
      if (this.config.autoGenerate) {
        const pages = this.getBindingValue('=$app.pages');
        this.items = map(pages, page => ({
          icon: page.meta.icon || snakeCase(page.name),
          label: page.meta.title,
          path: page.path,
        }));
      } else {
        this.loadData();
      }
    },
    renderDivider() {
      return this.$createElement(
        'v-divider',
        {
          props: {
            dark: this.isThemeDark,
            light: this.isThemeLight,
          },
        },
      );
    },
    renderList() {
      const context = this;
      const listItems = [];

      each(this.items, (item) => {
        let listItemChildren;

        /*
        Here we have different elements depending on mini flag.
        This is to accomodate custom mini Ride design.
        */
        if (this.isMini) {
          listItemChildren = [
            this.$createElement(
              'div',
              {
                class: 'menu-item-link',
              },
              [
                this.$createElement('v-icon', item.icon),
                this.$createElement('div', { class: 'menu-item-label' }, item.label),
              ],
            ),
          ];
        } else {
          listItemChildren = [
            this.$createElement('v-list-tile-action', [
              this.$createElement('v-icon', item.icon),
            ]),
            this.$createElement('v-list-tile-content', [
              this.$createElement('v-list-tile-title', item.label),
            ]),
          ];
        }

        const listItem = this.$createElement(
          'v-list-tile',
          {
            class: 'menu-item',
            props: {
              href: item.path,
            },
            on: {
              click() {
                context.selectItem(item);
              },
            },
          },
          listItemChildren,
        );

        listItems.push(listItem);
      });

      const list = this.$createElement('v-list', {
        props: {
          dense: false,
        },
      }, listItems);

      return list;
    },
    renderTitle() {
      const title = [];

      if (this.config.logo) {
        // TODO: Support once we have assets
        title.push();
      } else {
        title.push(
          this.$createElement(
            'v-icon',
            {
              class: 'menu-title-icon mb-1',
              props: {
                large: true,
              },
            },
            this.config.icon || 'explore',
          ),
        );
      }

      if (this.config.title) {
        title.push(
          this.$createElement(
            'div',
            {
              class: 'menu-title-label',
            },
            this.config.title,
          ),
        );
      }

      return this.$createElement(
        'v-list',
        {
          class: 'menu-title',
        },
        [
          this.$createElement('v-list-tile', title),
          this.renderDivider(),
        ],
      );
    },
  },
  watch: {
    dataSource() {
      if (!this.config.autoGenerate) {
        this.loadData();
      }
    },
    autoGenerate() {
      this.setItemsOrLoad();
    },
  },
  mounted() {
    this.setItemsOrLoad();
  },
  render(createElement) {
    return this.renderElement(
      'v-navigation-drawer',
      {
        key: this.schema.uid,
        class: this.getBindingValue(this.config.color),
        props: {
          absolute: this.isAbsolute,
          app: this.config.main,
          dark: this.isThemeDark,
          disableRouteWatcher: true,
          fixed: this.isFixed,
          height: this.height,
          left: this.isLeft,
          light: this.isThemeLight,
          miniVariant: this.isMini,
          right: this.isRight,
          value: this.isVisible,
          width: this.config.width,
        },
      },
      [
        this.renderTitle(),
        this.renderList(),
        createElement('v-spacer'),
      ],
    );
  },
};
