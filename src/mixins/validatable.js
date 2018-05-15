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
    validators() {
      const translations = this.translations;

      return {
        creditCard: {
          message: translations.validatorCreditCardMessage,
        },
        min: {
          message: translations.validatorMinMessage,
        },
        max: {
          message: translations.validatorMaxMessage,
        },
        minLength: {
          message: translations.validatorMinLengthMessage,
        },
        maxLength: {
          message: translations.validatorMaxLengthMessage,
        },
        minCount: {
          message: translations.validatorMinCountMessage,
        },
        maxCount: {
          message: translations.validatorMaxCountMessage,
        },
        integer: {
          message: translations.validatorIntegerMessage,
        },
        pattern: {
          message: translations.validatorPatternMessage,
        },
        required: {
          message: translations.validatorRequiredMessage,
        },
      };
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
    this.rules = validator.getRules(this.config, this.validators);
  },
};
