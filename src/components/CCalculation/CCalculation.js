import _ from 'lodash';
import CText from '../CText/CText';

const resolveValue = (value) => {
  const resolved = value;
  return resolved;
};

export default {
  name: 'c-calculation',
  extends: CText,
  watch: {
    value(value) {
      this.definition.hint = resolveValue(value);
    },
  },
  created() {
    _.assign(this.definition, {
      persistentHint: true,
    });
  },
};
