import _ from 'lodash';
import { validator } from '@validators';

export default {
  data() {
    return {
      // Property names in sync with vuetify
      valid: true,
      rules: null,
      errorBucket: {
        type: Array,
        default() {
          return [];
        },
      },
    };
  },
  computed: {
    hasError() {
      return !this.valid;
    },
  },
  methods: {
    validate() {
      this.errorBucket = [];

      if (this.rules) {
        _.each(this.rules, (rule) => {
          const isValid = rule(this.value);
          if (isValid !== true) {
            this.errorBucket.push(isValid);
          }
        });
      }

      this.valid = this.errorBucket.length === 0;

      return this.valid;
    },
  },
  mounted() {
    this.rules = validator.getRules(this.definition, this.options.validators);
  },
};
