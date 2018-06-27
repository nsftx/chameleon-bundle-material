export default {
  group: 'widgets',
  type: 'form',
  name: 'Form',
  icon: 'subtitles',
  optionGroups: {
    save: {
      key: 'save',
      name: 'Default Save Action',
    },
    clear: {
      key: 'clear',
      name: 'Default Clear Action',
    },
  },
  actions: [
    {
      name: 'save',
      help: 'Save Form',
    },
    {
      name: 'clear',
      help: 'Clear Form',
    },
  ],
  events: [
    {
      name: 'Saved',
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
    enabled: {
      type: 'check',
      name: 'Enable Default Actions',
      value: true,
    },
    save: {
      type: 'group',
      group: 'save',
      label: {
        type: 'input',
        name: 'Button Label',
        value: 'Save',
      },
      color: {
        type: 'colorPicker',
        name: 'Color',
        value: '',
      },
      icon: {
        type: 'check',
        name: 'Icon',
        value: false,
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
        type: 'check',
        name: 'Icon',
        value: false,
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
