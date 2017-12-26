import _ from 'lodash';
import CText from '../CText/CText';

export default {
  name: 'c-calculation',
  extends: CText,
  inject: ['form'],
  data() {
    return {
      resolvedValue: null,
    };
  },
  computed: {
    fields() {
      return _.reduce(this.form.fields, (result, field) => {
        const results = result;
        if (field.name !== this.name) {
          results[field.name] = field.value;
        }

        return results;
      }, {});
    },
  },
  watch: {
    fields: {
      handler() {
        this.resolveValue();
      },
      deep: false,
    },
  },
  methods: {
    resolveValue() {
      try {
        this.resolvedValue = _.template(this.value)(this.fields);
        this.definition.hint = this.resolvedValue;
      } catch (error) {
        // TODO: Show as field error
        this.definition.hint = error.message;
      }
    },
  },
  created() {
    _.assign(this.definition, {
      persistentHint: true,
    });

    this.$on('blur', this.resolveValue);
  },
};
