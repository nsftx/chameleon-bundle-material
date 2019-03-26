import Element from '../Element';

export default {
  extends: Element,
  render() {
    return this.renderElement(this.getElementTag('button'),
      {
        key: this.schema.uid,
        props: {
          definition: this.definition,
        },
      });
  },
};
