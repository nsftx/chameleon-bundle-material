import Element from '../Element';

export default {
  extends: Element,
  render(createElement) {
    const children = [
      createElement(
        'router-view',
      ),
    ];

    return this.renderElement('div', {}, children);
  },
};
