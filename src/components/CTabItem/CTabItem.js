import Element from '../Element';

const getTabItemContent = (context, createElement) => createElement(
  'v-card',
  {
    props: {
      flat: true,
      color: context.config.contentColor,
    },
  },
  [
    context.renderChildElement('v-card-text'),
  ],
);

export default {
  extends: Element,
  inject: ['cActiveTab'],
  props: {
    ordinal: {
      type: Number,
    },
  },
  data() {
    return {
      loadedOnce: false,
    };
  },
  computed: {
    activeTab() {
      return this.cActiveTab ? this.cActiveTab.value() : 0;
    },
    isActive() {
      return this.activeTab === this.ordinal;
    },
  },
  render(createElement) {
    const data = {
      key: this.schema.uid,
    };

    // Simulate tab content lazy loading - render tab item children
    // only when tab is active or it was previously loaded
    // TODO Vuetify 2 changed tab item behaviour, 'eager' prop is false by default
    // check can this part of logic be removed after upgrading
    if (this.isActive) this.loadedOnce = true;

    const shouldRenderChildren = this.isActive || this.loadedOnce;
    const children = shouldRenderChildren ? getTabItemContent(this, createElement) : [this.renderChildElement('div')];

    return this.renderElement('v-tab-item', data, children, true);
  },
};
