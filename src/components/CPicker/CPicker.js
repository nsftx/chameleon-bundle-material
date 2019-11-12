import {
  format,
  setHours,
  setMinutes,
  parseISO,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { isNil } from 'lodash';
import { fieldable } from '@/mixins';
import Element from '../Element';

const getDatePickerProps = (context) => {
  const self = context;
  self.value = context.config.value ? context.config.value.substring(0, 10) : null;

  const props = {
    noTitle: false,
    scrollable: true,
    autosave: true,
    color: context.config.color,
    dark: context.isThemeDark,
    light: context.isThemeLight,
    fullWidth: context.config.fullWidth,
    width: context.config.width || 290,
    value: self.value,
    min: context.config.allowedDates ? context.config.allowedDates.min : null,
    max: context.config.allowedDates ? context.config.allowedDates.max : null,
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
      self.value = !isNil(value) ? zonedTimeToUtc(new Date(value), Intl.DateTimeFormat()
        .resolvedOptions().timeZone).toISOString() : value;
      self.$emit('input', self.value);
      self.$emit('formattedInput', self.formattedValue);
    },
  };

  return listeners;
};

const getTimePickerProps = (context) => {
  const props = {
    noTitle: false,
    scrollable: true,
    autosave: true,
    width: context.config.width || 290,
    value: context.parsedTimeValue,
    color: context.config.color,
    dark: context.isThemeDark,
    light: context.isThemeLight,
    fullWidth: context.config.fullWidth,
  };

  return props;
};

const getTimePickerActionSlot = (createElement, context) => {
  const self = context;

  const slot = {
    default: () => createElement('v-card-actions', {
      staticClass: 'pa-0',
    },
    [
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
      const splitTime = value.split(':');
      const hours = splitTime[0];
      const minutes = splitTime[1];
      const formattedValue = setMinutes(setHours(zonedTimeToUtc(self.value
        ? parseISO(self.value) : new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone),
      parseInt(hours, 10)), parseInt(minutes, 10)).toISOString();
      if (self.value !== formattedValue) {
        self.value = formattedValue;
      }
      self.$emit('input', self.value);
      self.$emit('formattedInput', self.formattedValue);
    },
  };

  return listeners;
};

export default {
  extends: Element,
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
      return this.config.time && this.config.time.enabled;
    },
    formattedValue() {
      if (this.value) {
        const { format: formatVal } = this.config;
        const formattedValue = format(zonedTimeToUtc(parseISO(this.value), Intl.DateTimeFormat()
          .resolvedOptions().timeZone), formatVal);
        return formattedValue;
      }

      return null;
    },
    parsedTimeValue() {
      const value = this.value ? parseISO(this.value) : new Date();
      const parsedValue = format(zonedTimeToUtc(value, Intl.DateTimeFormat()
        .resolvedOptions().timeZone), 'p').replace(/\s/g, '').toLowerCase();

      return parsedValue;
    },
  },
  render(createElement) {
    const children = [];

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

    return createElement('v-card',
      {
        staticClass: 'd-inline',
        props: {
          flat: true,
        },
      },
      children);
  },
};
