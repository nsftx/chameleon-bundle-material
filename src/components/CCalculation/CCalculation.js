import _ from 'lodash';
import CText from '../CText/CText';

const templateLiteralRegex = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

const getMath = () => {
  const native = Object.getOwnPropertyNames(Math);
  const lodash = {
    sum: (...args) => _.sum(args),
  };

  return _.reduce(native, (result, method) => {
    //eslint-disable-next-line
    result[method] = Math[method];
    return result;
  }, lodash);
};

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
    isTemplateLiteral() {
      return this.value && _.isArray(this.value.match(templateLiteralRegex));
    },
    templateValue() {
      return this.isTemplateLiteral ? this.value : `<%= ${this.value} %>`;
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
        const templateData = _.assign(getMath(), this.fields);
        this.resolvedValue = _.template(this.templateValue)(templateData);
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
