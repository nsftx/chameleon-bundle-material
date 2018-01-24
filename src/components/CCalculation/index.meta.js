export default {
  group: 'inputs',
  type: 'calculation',
  name: 'Calculation Box',
  icon: 'functions',
  options: {
    prependIcon: {
      type: 'input',
      name: 'Prepend Icon',
      value: 'person',
      priority: 1,
    },
    appendIcon: {
      type: 'input',
      name: 'Append Icon',
      value: '',
      priority: 2,
    },
    prefix: {
      type: 'input',
      name: 'Prefix',
      value: '',
      priority: 3,
    },
    suffix: {
      type: 'input',
      name: 'Suffix',
      value: '',
      priority: 4,
    },
    hint: {
      type: 'input',
      name: 'Hint Text',
      value: '',
      priority: 5,
    },
  },
};
