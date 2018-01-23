export default {
  group: 'inputs',
  type: 'calculation',
  name: 'Calculation Box',
  icon: 'functions',
  options: {
    prependIcon: {
      type: 'input',
      name: 'Prepend icon',
      value: 'person',
      priority: 1,
    },
    appendIcon: {
      type: 'input',
      name: 'Append icon',
      value: '',
      priority: 2,
    },
    prefix: {
      type: 'input',
      name: 'Perfix',
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
      name: 'Hint text',
      value: '',
      priority: 5,
    },
  },
};
