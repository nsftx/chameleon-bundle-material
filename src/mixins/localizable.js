import { isEmpty } from 'lodash';
import locale from '@locale';

export default {
  data() {
    return {
      translations: locale,
    };
  },
  methods: {
    localize(value) {
      return isEmpty(value) ? null : value;
    },
  },
};
