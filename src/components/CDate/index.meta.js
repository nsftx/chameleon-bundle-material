export default {
  group: 'inputs',
  type: 'date',
  name: 'Date Input',
  icon: 'calendar_today',
  optionGroups: {
    validation: {
      key: 'validation',
      name: 'Validation',
    },
  },
  events: [
    {
      name: 'Changed',
      help: 'Date clicked, date value changed',
    },
    {
      name: 'VisibilityChanged',
      help: 'Date picker menu visibility changed',
    },
  ],
  options: {
    color: true,
    name: {
      type: 'fieldNameInput',
      name: 'Input Name used by Form',
      value: null,
      priority: 1,
      validation: {
        required: true,
      },
    },
    label: {
      type: 'input',
      name: 'Label Text',
      value: null,
      priority: 2,
    },
    prependIcon: {
      type: 'iconSource',
      name: 'Prepend Icon',
      value: null,
      priority: 3,
    },
    appendIcon: {
      type: 'iconSource',
      name: 'Append Icon',
      value: null,
      priority: 4,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
      priority: 5,
    },
    tooltip: {
      type: 'input',
      name: 'Tooltip Text',
      value: null,
      priority: 6,
    },
    format: {
      type: 'select',
      name: 'Date Format',
      items: [
        {
          name: 'Day of week, Month, Day of month, Year, Time',
          value: 'PPPPpppp',
        },
        {
          name: 'Month, Day of Month, Year, Time',
          value: 'PPpp',
        },
        {
          name: 'Month, Day of Month, Year',
          value: 'PPP',
        },
        {
          name: 'MM/DD/YYYY',
          value: 'P',
        },
        {
          name: 'DD/MM/YYYY',
          value: 'MM/dd/yyyy',
        },
        {
          name: 'MM-DD-YYYY',
          value: 'MM-dd-yyyy',
        },
        {
          name: 'DD-MM-YYYY',
          value: 'dd-MM-yyyy',
        },
        {
          name: 'YYYY-MM-DD',
          value: 'yyyy-MM-dd',
        },
      ],
      value: 'PPpp',
      priority: 7,
    },
    time: {
      type: 'subGroup',
      name: 'Time',
      enabled: {
        type: 'check',
        name: 'Enable time',
        value: false,
      },
      priority: 10,
    },
    clearable: {
      type: 'check',
      name: 'Enable Input Clear',
      value: false,
      priority: 9,
    },
    validation: {
      type: 'group',
      group: 'validation',
      required: {
        type: 'check',
        name: 'Required',
        value: false,
      },
      minDate: {
        type: 'date',
        name: 'Min Date',
        value: null,
      },
      maxDate: {
        type: 'date',
        name: 'Max Date',
        value: null,
      },
    },
    theme: true,
  },
};
