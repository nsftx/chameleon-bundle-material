import { assign, isArray, reduce, sum, template } from 'lodash';
import Text from '../CText/CText';

const templateLiteralRegex = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

const getMath = () => {
  const native = Object.getOwnPropertyNames(Math);
  const lodash = {
    sum: (...args) => sum(args),
  };

  return reduce(native, (result, method) => {
    //eslint-disable-next-line
    result[method] = Math[method];
    return result;
  }, lodash);
};

export default {
  extends: Text,
  inject: ['cEntity'],
  data() {
    return {
      isResolvable: true,
      resolvedValue: null,
    };
  },
  computed: {
    fields() {
      return reduce(this.cEntity.fields(), (result, field) => {
        const results = result;
        if (field.name !== this.$options.name) {
          results[field.name] = field.value;
        }

        return results;
      }, {});
    },
    isTemplateLiteral() {
      return this.value && isArray(this.value.match(templateLiteralRegex));
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
        const templateData = assign(getMath(), this.fields);
        this.resolvedValue = template(this.templateValue)(templateData);
        this.config.hint = this.resolvedValue;
      } catch (error) {
        // TODO: Show as field error
        this.config.hint = error.message;
      }
    },
  },
  created() {
    assign(this.config, {
      persistentHint: true,
    });
  },
};
