export default {
  group: 'widgets',
  type: 'form',
  name: 'Form',
  icon: 'subtitles',
  actions: [
    {
      name: 'save',
      help: 'Save form',
    },
  ],
  events: [
    {
      name: 'Saved',
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
  },
  children: [
    'inputs',
  ],
};
