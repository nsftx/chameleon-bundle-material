import _template from 'lodash/template';
import requiredValidator from './requiredValidator';
import creditCardValidator from './creditCardValidator';

const validator = {
  required: requiredValidator,
  creditCard: creditCardValidator,
};

// Library accepts only string so we need to coerce it
// https://github.com/chriso/validator.js/
// eslint-disable-next-line
const getValue = value => value + '';

const getMessage = (result, definition) => {
  const message = result !== true ? _template(result)({
    field: definition.label,
  }) : true;

  return message;
};

export default {
  getRules(definition, validators) {
    const validation = definition.validation;
    const rules = [];

    if (validation.required) {
      rules.push(value => getMessage(validator.required(
        validators.required,
        getValue(value),
      ), definition));
    }

    if (validation.pattern) {
      const predefined = validation.pattern.predefined;
      if (predefined) {
        rules.push(value => getMessage(validator[predefined](
          validators[predefined],
          getValue(value),
        ), definition));
      }
    }

    return rules;
  },
};
