import _ from 'lodash';
import creditCardValidator from './creditCardValidator';
import integerValidator from './integerValidator';
import minValidator from './minValidator';
import maxValidator from './maxValidator';
import minLengthValidator from './minLengthValidator';
import maxLengthValidator from './maxLengthValidator';
import patternValidator from './patternValidator';
import requiredValidator from './requiredValidator';

const validator = {
  creditCard: creditCardValidator,
  integer: integerValidator,
  min: minValidator,
  max: maxValidator,
  minLength: minLengthValidator,
  maxLength: maxLengthValidator,
  pattern: patternValidator,
  required: requiredValidator,
};

// Library accepts only string so we need to coerce it
// https://github.com/chriso/validator.js/
// eslint-disable-next-line
const getValue = value => _.isNil(value) ? '' : value + '';

const getMessage = (result, data) => {
  const message = result !== true ? _.template(result)(data) : true;

  return message;
};

export default {
  getRules(definition, validators) {
    const validation = definition.validation;
    const rules = [];

    if (!validation) return rules;

    // TODO: Shorten/generalize rules functions
    if (validation.required) {
      rules.push(value => getMessage(validator.required(
        validators.required,
        getValue(value),
      ), { field: definition.label }));
    }

    if (!_.isUndefined(validation.min)) {
      rules.push(value => getMessage(validator.min(
        validators.min,
        getValue(value),
        validation.min,
      ), { field: definition.label, limit: validation.min }));
    }

    if (!_.isUndefined(validation.max)) {
      rules.push(value => getMessage(validator.max(
        validators.max,
        getValue(value),
        validation.max,
      ), { field: definition.label, limit: validation.max }));
    }

    if (!_.isUndefined(validation.minLength)) {
      rules.push(value => getMessage(validator.minLength(
        validators.minLength,
        getValue(value),
        validation.minLength,
      ), { field: definition.label, limit: validation.minLength }));
    }

    if (!_.isUndefined(validation.maxLength)) {
      rules.push(value => getMessage(validator.maxLength(
        validators.maxLength,
        getValue(value),
        validation.maxLength,
      ), { field: definition.label, limit: validation.maxLength }));
    }

    if (validation.pattern) {
      const predefined = validation.pattern.predefined;
      if (predefined) {
        rules.push(value => getMessage(validator[predefined](
          validators[predefined],
          getValue(value),
        ), { field: definition.label }));
      } else {
        // Pattern validator
        rules.push(value => getMessage(validator.pattern(
          validators.pattern,
          getValue(value),
          validation.pattern.value,
        ), { field: definition.label }));
      }
    }

    return rules;
  },
};
