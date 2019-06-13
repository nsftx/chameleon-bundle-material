import Element from '../Element';

export default {
  extends: Element,
  render() {
    const data = {
      key: this.schema.uid,
      class: {
        [`xs${this.config.size}`]: true,
        [this.config.color]: true,
        flex: true,
      },
      props: {
        flat: true,
      },
    };

    const children = this.renderChildElement('div');

    return this.renderElement('v-card', data, children, true);
  },
};
