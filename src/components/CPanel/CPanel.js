import Element from '../Element';

export default {
  extends: Element,
  render() {
    const definition = this.definition;

    const data = {
      key: this.schema.uid,
      props: {
        color: this.getBindingValue(definition.color),
        flat: definition.flat,
      },
      style: {
        width: definition.width,
      },
    };

    const children = this.renderChildElement('div');

    return this.renderElement('v-card', data, children);
  },
};
