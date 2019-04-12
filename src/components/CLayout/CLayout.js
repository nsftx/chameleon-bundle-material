import { merge } from 'lodash';
import Element from '../Element';

const getLayoutAttrs = () => {
  const attrs = {
    'data-wrapper': 'layout',
  };
  return attrs;
};

export default {
  extends: Element,
  methods: {
    renderMenu() {
      return this.$createElement(
        'c-menu',
        {
          props: {
            definition: merge({}, this.config.elements[0], {
              isVisible: true,
              absolute: false,
              permanent: true,
              fixed: true,
              main: true,
              title: 'Ride',
              autoGenerate: true,
            }),
          },
          attrs: getLayoutAttrs(),
        },
      );
    },
    renderContent() {
      return this.$createElement('v-container', {
        attrs: {
          'fill-height': true,
          fluid: true,
        },
      },
      [
        this.$createElement('v-layout', {},
          [
            this.$createElement('v-flex', {}, [
              this.$scopedSlots.default(),
            ]),
          ]),
      ]);
    },
    renderDesner() {
      // TODO when we get definition this will be separate component
      return this.$createElement('v-navigation-drawer', {
        props: {
          isVisible: true,
          absolute: false,
          permanent: true,
          fixed: true,
          main: true,
          autoGenerate: true,
          right: true,
          width: '50px',
        },
      });
    },
  },
  render(createElement) {
    if (this.config.layoutType === 'blank') {
      return this.renderElement('div', {},
        [
          this.$scopedSlots.default(),
        ]);
    }
    const children = [
      createElement('v-content', {
        class: 'fill-height',
      },
      [
        this.renderMenu(),
        this.renderContent(),
        this.renderDesner(),
      ]),
    ];

    return this.renderElement('div', {}, children);
  },
};
