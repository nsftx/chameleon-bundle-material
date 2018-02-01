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
    prependIcon: {
      type: 'input',
      name: 'Prepend Icon',
      value: null,
      priority: 1,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: null,
      priority: 2,
    },
    prefix: {
      type: 'input',
      name: 'Prefix',
      value: null,
      priority: 3,
    },
    suffix: {
      type: 'input',
      name: 'Suffix',
      value: null,
      priority: 4,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: null,
      priority: 5,
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
