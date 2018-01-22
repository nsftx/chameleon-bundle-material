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
    },
    appendIcon: {
      type: 'input',
      name: 'Append icon',
      value: '',
    },
    prefix: {
      type: 'input',
      name: 'Perfix',
      value: '',
    },
    suffix: {
      type: 'input',
      name: 'Suffix',
      value: '',
    },
    hint: {
      type: 'input',
      name: 'Hint text',
      value: '',
    },
  },
};
