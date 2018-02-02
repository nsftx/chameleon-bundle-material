import _ from 'lodash';
import namespace from '@namespace';

export default {
  name: `${namespace}list`,
  props: {
    definition: {
      type: Object,
      required: true,
    },
    validators: {
      type: Object,
    },
  },
  render(createElement) {
    const self = this;

    return createElement(
      'v-data-iterator',
      {
       
      },
    );
  },
};
