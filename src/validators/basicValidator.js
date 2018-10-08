import { isNil, template } from 'lodash';
import creditCardValidator from './creditCardValidator';
import integerValidator from './integerValidator';
import minValidator from './minValidator';
import maxValidator from './maxValidator';
import minLengthValidator from './minLengthValidator';
import maxLengthValidator from './maxLengthValidator';
import minCountValidator from './minCountValidator';
import maxCountValidator from './maxCountValidator';
import patternValidator from './patternValidator';
import requiredValidator from './requiredValidator';
import urlValidator from './urlValidator';

const validator = {
  creditCard: creditCardValidator,
  integer: integerValidator,
  min: minValidator,
  max: maxValidator,
  minLength: minLengthValidator,
  maxLength: maxLengthValidator,
  minCount: minCountValidator,
  maxCount: maxCountValidator,
  pattern: patternValidator,
  required: requiredValidator,
  urlValidator,
};

// Library accepts only string so we need to coerce it
// https://github.com/chriso/validator.js/
// eslint-disable-next-line
const getValue = value => isNil(value) || value === false ? '' : value + '';

const getMessage = (result, data) => {
  const message = result !== true ? template(result)(data) : true;

  return message;
};

export default {
  getRules(config, validators) {
    const validation = config.validation;
    const rules = [];

    if (isNil(validators) || isNil(validation)) return rules;

    // TODO: Shorten/generalize rules functions
    if (validation.required) {
      rules.push(value => getMessage(validator.required(
        validators.required,
        getValue(value),
      ), { field: config.label }));
    }

    if (!isNil(validation.min) && validation.min !== '') {
      rules.push(value => getMessage(validator.min(
        validators.min,
        getValue(value),
        validation.min,
      ), { field: config.label, limit: validation.min }));
    }

    if (!isNil(validation.max) && validation.max !== '') {
      rules.push(value => getMessage(validator.max(
        validators.max,
        getValue(value),
        validation.max,
      ), { field: config.label, limit: validation.max }));
    }

    if (!isNil(validation.minLength) && validation.minLength !== '') {
      rules.push(value => getMessage(validator.minLength(
        validators.minLength,
        getValue(value),
        validation.minLength,
      ), { field: config.label, limit: validation.minLength }));
    }

    if (!isNil(validation.maxLength) && validation.maxLength !== '') {
      rules.push(value => getMessage(validator.maxLength(
        validators.maxLength,
        getValue(value),
        validation.maxLength,
      ), { field: config.label, limit: validation.maxLength }));
    }

    if (!isNil(validation.minCount) && validation.minCount !== '') {
      rules.push(value => getMessage(validator.minCount(
        validators.minCount,
        getValue(value),
        validation.minCount,
      ), { field: config.label, limit: validation.minCount }));
    }

    if (!isNil(validation.maxCount) && validation.maxCount !== '') {
      rules.push(value => getMessage(validator.maxCount(
        validators.maxCount,
        getValue(value),
        validation.maxCount,
      ), { field: config.label, limit: validation.maxCount }));
    }

    if (validation.pattern) {
      const predefined = validation.pattern.predefined;
      if (predefined) {
        rules.push(value => getMessage(validator[predefined](
          validators[predefined],
          getValue(value),
        ), { field: config.label }));
      } else {
        // Pattern validator
        rules.push(value => getMessage(validator.pattern(
          validators.pattern,
          getValue(value),
          validation.pattern,
        ), { field: config.label }));
      }
    }

    if (!isNil(validation.urlValidator)) {
      rules.push(value => getMessage(validator.urlValidator(
        validators.isUrl,
        getValue(value),
      ), { field: config.label }));
    }

    return rules;
  },
};
