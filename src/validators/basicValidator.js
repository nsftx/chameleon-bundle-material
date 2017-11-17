import requiredValidator from './requiredValidator';
import creditCardValidator from './creditCardValidator';

const validators = {
  required: requiredValidator,
  creditCard: creditCardValidator,
};

// Library accepts only string so we need to coerce it
// https://github.com/chriso/validator.js/
// eslint-disable-next-line
const getValue = value => value + '';

export default {
  getRules(definition) {
    const validation = definition.validation;
    const rules = [];

    if (validation.required) {
      rules.push(value => validators.required(getValue(value), definition));
    }

    if (validation.pattern) {
      const predefined = validation.pattern.predefined;
      if (predefined) {
        rules.push(value => validators[predefined](getValue(value), definition));
      }
    }

    return rules;
  },
};
