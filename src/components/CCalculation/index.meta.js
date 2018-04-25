export default {
  group: 'inputs',
  type: 'calculation',
  name: 'Calculation Box',
  icon: 'functions',
  optionGroups: {
    validation: {
      key: 'validation',
      name: 'Validation',
    },
  },
  options: {
    label: {
      type: 'input',
      name: 'Calculation Label',
      value: 'Calculation Field',
      priority: 1,
    },
    placeholder: {
      type: 'input',
      name: 'Placeholder Label',
      value: 'Please enter formula',
      priority: 2,
    },
    prependIcon: {
      type: 'input',
      name: 'Prepend Icon',
      value: null,
      priority: 3,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: null,
      priority: 4,
    },
    prefix: {
      type: 'input',
      name: 'Prefix',
      value: null,
      priority: 5,
    },
    suffix: {
      type: 'input',
      name: 'Suffix',
      value: null,
      priority: 6,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
      priority: 7,
    },
    value: {
      type: 'input',
      name: 'Calculation Value',
      value: null,
      priority: 8,
    },
    validation: {
      type: 'group',
      group: 'validation',
      required: {
        type: 'check',
        name: 'Enable required',
        value: false,
      },
    },
  },
};
