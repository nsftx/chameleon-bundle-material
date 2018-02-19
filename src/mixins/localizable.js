import { isEmpty } from 'lodash';

export default {
  methods: {
    localize(value) {
      return (isEmpty(value) ? null : value);
    },
  },
};
