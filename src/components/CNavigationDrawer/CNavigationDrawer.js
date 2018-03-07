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

const getListTitle = (createElement, item) => createElement('v-list-tile-content', [
  createElement('v-list-tile-title', item.title),
  createElement('v-list-tile-sub-title', item.description),
]);

const createListChildren = (createElement, item) => createElement('v-list-tile', {
  attrs: {
    key: item.title,
  },
},
  [
    createElement('v-list-tile-action', [
      getListAvatar(createElement, item),
    ]),
    getListTitle(createElement, item),
  ]);

export default {
  mixins: [
    elementable,
    fieldable,
    validatable,
  ],
  render(createElement) {
    return createElement(
      'v-navigation-drawer',
      {
        staticClass: `${this.baseClass} ${this.$options.name}`,
        attrs: this.getSchemaAttributes(),
      },
      [
        createElement('v-list', [
          createElement('v-list-tile', [
            createElement('v-list-tile-avatar', [
              getListAvatar(createElement, this.definition.titleAvatar),
            ]),
            getListTitle(createElement, this.definition),
          ]),
        ]),
        createElement('v-list', [
          map(this.definition.dataSource.items, item => createListChildren(createElement, item)),
        ]),
      ],
    );
  },
};
