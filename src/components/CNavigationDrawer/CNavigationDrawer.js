import { elementable, fieldable, validatable } from '@mixins';
import { map } from 'lodash';

const getListAvatar = (createElement, item) => {
  if (item.thumb) {
    return createElement('img', {
      attrs: {
        src: item.thumb,
      },
    });
  } else if (item.icon) {
    return createElement('v-icon', item.icon);
  }
  return false;
};

const getListTitleContent = (createElement, item) => createElement('v-list-tile-content', [
  createElement('v-list-tile-title', item.title),
  createElement('v-list-tile-sub-title', item.description),
]);

const getListTitle = (createElement, context) => {
  if (!context.showTitle) return false;

  return createElement('v-list', [
    createElement('v-list-tile', [
      createElement('v-list-tile-avatar', [
        getListAvatar(createElement, context.titleAvatar),
      ]),
      getListTitleContent(createElement, context),
    ]),
  ]);
};

const createListChildren = (createElement, item) => createElement('v-list-tile', {
  attrs: {
    key: item.title,
    to: item.path === '#' ? '' : item.path,
  },
},
  [
    createElement('v-list-tile-action', [
      getListAvatar(createElement, item),
    ]),
    getListTitleContent(createElement, item),
  ]);

export default {
  props: {
    drawer: {
      type: Boolean,
      default: true,
    },
  },
  mixins: [
    elementable,
    fieldable,
    validatable,
  ],
  render(createElement) {
    const children = [
      createElement(
        'v-navigation-drawer',
        {
          attrs: {
            app: true,
          },
          props: {
            value: this.drawer,
          },
        },
        [
          getListTitle(createElement, this.definition),
          createElement('v-list', [
            map(this.definition.dataSource.items, item =>
              createListChildren(createElement, item)),
          ]),
        ],
      ),
    ];

    return createElement('div', {
      attrs: this.getSchemaAttributes(),
      staticClass: `${this.baseClass} ${this.$options.name}`,
    }, children);
  },
};
