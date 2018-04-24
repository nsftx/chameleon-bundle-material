import Element from '../Element';

require('../../style/components/_hlist.styl');

export default {
  extends: Element,
  render() {
    const self = this;

    const data = {
      key: self.schema.uid,
      class: {
        [`${self.$options.name}--spaced`]: self.definition.gutter,
      },
      props: {
        color: self.definition.color,
        flat: self.definition.flat,
      },
      style: {
        backgroundColor: self.definition.color,
      },
    };

    const children = this.renderChildElement('div');

    return this.renderElement('v-card', data, children);
  },
};
