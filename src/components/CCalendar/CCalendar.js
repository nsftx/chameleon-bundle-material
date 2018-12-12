import { isNil } from 'lodash';
import { fieldable, validatable } from '@mixins';
import { validator } from '@validators';
import Element from '../Element';

const getAllowedDates = (context) => {
  if (isNil(context.validation)) return null;
  const max = context.validation.maxDate;
  const min = context.validation.minDate;

  const validateDates = () => {
    if (max < min) {
      return {
        min: max,
        max: min,
      };
    }
    return {
      min: moment(min).isValid() ? min : null,
      max: moment(max).isValid() ? max : null,
    };
  };

  return validateDates();
};

const getPickerProps = (context) => {
  const definition = context.config;
  definition.allowedDates = getAllowedDates(definition);
  definition.value = context.value;

  const props = {
    definition,
  };

  return props;
};

const getPicker = (context, createElement) => {
  const self = context;

  return createElement(
    self.getElementTag('picker'),
    {
      props: getPickerProps(context),
      on: {
        input(value) {
          self.value = value;
          self.sendToEventBus('Changed', { value });
        },
      },
    },
  );
};

const getPropRequired = (config) => {
  if (config.validation) {
    return !!config.validation.required;
  }
  return false;
};

const getHiddenInput = (context, createElement) => {
  // Fake input, for c-form model
  const self = context;
  const config = self.config;
  return createElement('v-input',
    {
      attrs: {
        name: self.config.name,
      },
      props: {
        value: self.value || null,
        required: getPropRequired(config),
        rules: validator.getRules(config, self.validators),
      },
      on: {
        input(value) {
          self.value = value;
        },
      },
    });
};

export default {
  extends: Element,
  mixins: [
    fieldable,
    validatable,
  ],
  render(createElement) {
    const children = [
      getPicker(this, createElement),
      getHiddenInput(this, createElement),
    ];

    return this.renderElement('div', {
    }, children);
  },
};
