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
    name: {
      type: 'input',
      name: 'Name',
      value: 'form',
      priority: 1,
    },
  },
  children: [
    'inputs',
  ],
};
