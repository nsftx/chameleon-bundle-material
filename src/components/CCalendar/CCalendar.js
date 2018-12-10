import { isNil } from 'lodash';
import { validatable } from '@mixins';
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
  if (context.value) definition.value = context.value;

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
        formattedInput(value) {
          self.formattedValue = value;
        },
      },
    },
  );
};

export default {
  extends: Element,
  mixins: [
    validatable,
  ],
  data() {
    return {
      formatedValue: null,
    };
  },
  render(createElement) {
    const children = [
      getPicker(this, createElement),
    ];

    return this.renderElement('div', {}, children);
  },
};
