export default {
  group: 'widgets',
  type: 'form',
  name: 'Form',
  icon: 'subtitles',
  optionGroups: {
    submit: {
      key: 'submit',
      name: 'Submit Action',
    },
    clear: {
      key: 'clear',
      name: 'Clear Action',
    },
  },
  actions: [
    {
      name: 'submit',
      help: 'Submit Form',
    },
    {
      name: 'clear',
      help: 'Clear Form',
    },
  ],
  events: [
    {
      name: 'Submitted',
    },
    {
      name: 'Cleared',
    },
    {
      name: 'Errored',
    },
  ],
  options: {
    color: true,
    name: {
      type: 'input',
      name: 'Name',
      value: 'form',
      priority: 1,
    },
    theme: true,
    submit: {
      type: 'group',
      group: 'submit',
      label: {
        type: 'input',
        name: 'Button Label',
        value: 'Submit',
      },
      color: {
        type: 'colorPicker',
        name: 'Color',
        value: '',
      },
      icon: {
        type: 'iconSource',
        name: 'Icon Source',
        value: null,
      },
      iconPosition: {
        type: 'select',
        name: 'Icon Position',
        items: [
          {
            name: 'Left',
            value: 'left',
          },
          {
            name: 'Right',
            value: 'right',
          },
        ],
        returnObject: false,
        displayProp: 'name',
        valueProp: 'value',
        value: 'left',
        priority: 4,
      },
      round: {
        type: 'check',
        name: 'Round Button',
        value: false,
      },
      flat: {
        type: 'check',
        name: 'No Background',
        value: false,
      },
      block: {
        type: 'check',
        name: '100% Width',
        value: false,
      },
      depressed: {
        type: 'check',
        name: 'No Shadow',
        value: false,
      },
    },
    clear: {
      type: 'group',
      group: 'clear',
      label: {
        type: 'input',
        name: 'Button Label',
        value: 'Clear',
      },
      color: {
        type: 'colorPicker',
        name: 'Color',
        value: '',
      },
      icon: {
        type: 'iconSource',
        name: 'Icon Source',
        value: null,
      },
      iconPosition: {
        type: 'select',
        name: 'Icon Position',
        items: [
          {
            name: 'Left',
            value: 'left',
          },
          {
            name: 'Right',
            value: 'right',
          },
        ],
        returnObject: false,
        displayProp: 'name',
        valueProp: 'value',
        value: 'left',
        priority: 4,
      },
      round: {
        type: 'check',
        name: 'Round Button',
        value: false,
      },
      flat: {
        type: 'check',
        name: 'No Background',
        value: false,
      },
      block: {
        type: 'check',
        name: '100% Width',
        value: false,
      },
      depressed: {
        type: 'check',
        name: 'No Shadow',
        value: false,
      },
    },
  },
  children: [
    'inputs',
  ],
};
