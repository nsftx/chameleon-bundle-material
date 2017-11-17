import requiredValidator from './requiredValidator';
import creditCardValidator from './creditCardValidator';

const validators = {
  required: requiredValidator,
  creditCard: creditCardValidator,
};

export default {
  getRules(definition) {
    const validation = definition.validation;
    const rules = [];

    if (validation.required) {
      rules.push(value => validators.required(value, definition));
    }

    if (validation.pattern) {
      const predefined = validation.pattern.predefined;
      if (predefined) {
        rules.push(value => validators[predefined](value, definition));
      }
    }

    return rules;
  },
};
