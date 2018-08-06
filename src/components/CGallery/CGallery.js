import { map, isNil } from 'lodash';
import Element from '../Element';

const getImages = (createElement, context) => {
  const data = context.config.dataSource;
  if (!isNil(data.items && data.items.length > 0)) {
    return map(data.items, (item, i) => createElement('v-flex',
      {
        props:
        {
          key: i,
        },
      },
      [
        createElement('v-card', {
          props: {
            flat: true,
            tile: true,
          },
        },
          [
            createElement('v-card-media', {
              props: {
                src: item,
                height: '150px',
              },
            }),
          ]),
      ],
    ));
  }
  return [];
};

export default {
  extends: Element,
  data() {
    return {
    };
  },
  render(createElement) {
    const children = createElement(
      'v-layout',
      {
        props: {
          row: true,
          wrap: true,
        },
      },
      getImages(createElement, this),
    );

    return this.renderElement('v-container', {}, children);
  },
};
