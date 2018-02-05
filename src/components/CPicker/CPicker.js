import namespace from '@namespace';
import { fieldable } from '@mixins';

const getDatePickerProps = (context) => {
  const props = {
    noTitle: false,
    scrollable: true,
    autosave: true,
    fullWidth: context.definition.fullWidth,
    width: context.definition.width,
    value: context.value,
  };

  return props;
};

const getDatePickerActionSlot = (createElement, context) => {
  const self = context;

  const slot = {
    default: () => createElement('v-card-actions', [
      createElement('v-spacer'),
      createElement('v-btn',
        {
          props: {
            flat: true,
            icon: true,
          },
          on: {
            click() {
              self.isTimeVisible = true;
            },
          },
        },
        [
          createElement('v-icon', 'access_time'),
        ]),
    ]),
  };

  return slot;
};

const getDatePickerListeners = (context) => {
  const self = context;

  const listeners = {
    input(value) {
      self.value = moment.utc(value).toISOString();
    },
  };

  return listeners;
};

const getTimePickerProps = (context) => {
  const props = {
    noTitle: false,
    scrollable: true,
    autosave: true,
    value: context.parsedTimeValue,
  };

  return props;
};

const getTimePickerActionSlot = (createElement, context) => {
  const self = context;

  const slot = {
    default: () => createElement('v-card-actions', [
      createElement('v-spacer'),
      createElement('v-btn',
        {
          props: {
            flat: true,
            icon: true,
          },
          on: {
            click() {
              self.isTimeVisible = false;
            },
          },
        },
        [
          createElement('v-icon', 'date_range'),
        ]),
    ]),
  };

  return slot;
};

const getTimePickerListeners = (context) => {
  const self = context;

  const listeners = {
    input(value) {
      const isPm = value.indexOf('pm') > -1;
      const hours = parseInt(value.substring(0, 1), 10) + (isPm ? 12 : 0);
      const minutes = parseInt(value.substring(2, 4), 10);
      const formattedValue = moment.utc(self.value).hours(hours).minutes(minutes).toISOString();

      if (self.value !== formattedValue) {
        self.value = formattedValue;
      }
    },
  };

  return listeners;
};

export default {
  name: `${namespace}picker`,
  mixins: [
    fieldable,
  ],
  props: {
    startRange: {
      type: Boolean,
      default: false,
    },
    endRange: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isTimeVisible: false,
    };
  },
  computed: {
    hasTimeComponent() {
      return this.definition.time && this.definition.time.enabled;
    },
    formattedValue() {
      if (this.value) {
        const format = this.definition.format || (this.hasTimeComponent ? 'LLL' : 'LL');
        const formattedValue = moment.utc(this.value).format(format);

        return formattedValue;
      }

      return null;
    },
    parsedTimeValue() {
      const value = this.value ? moment.utc(this.value) : moment.utc();
      const parsedValue = value.format('LT').replace(/\s/g, '').toLowerCase();

      return parsedValue;
    },
  },
  watch: {
    value() {
      this.$emit('input', this.value);
      this.$emit('formattedInput', this.formattedValue);
    },
  },
  render(createElement) {
    const children = [];
    this.value = this.definition.value;

    if (this.hasTimeComponent && this.isTimeVisible) {
      children.push([
        createElement(
          'v-time-picker',
          {
            scopedSlots: getTimePickerActionSlot(createElement, this),
            props: getTimePickerProps(this),
            on: getTimePickerListeners(this),
          },
        ),
      ]);
    } else {
      children.push([
        createElement(
          'v-date-picker',
          {
            scopedSlots: this.hasTimeComponent && getDatePickerActionSlot(createElement, this),
            props: getDatePickerProps(this),
            on: getDatePickerListeners(this),
          },
        ),
      ]);
    }

    return createElement(
      'div',
      children,
    );
  },
};
