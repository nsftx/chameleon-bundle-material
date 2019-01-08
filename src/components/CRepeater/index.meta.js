export default {
  group: 'widgets',
  type: 'repeater',
  name: 'Repeater',
  icon: 'featured_play_list',
  optionGroups: {
    data: {
      key: 'data',
      name: 'Data',
    },
  },
  actions: [
    {
      name: 'setDataSource',
      help: 'Sets table data source from event data',
    },
  ],
  events: [
    {
      name: 'DataSourceChanged',
      help: 'Fires when table data source is changed',
    },
  ],
  options: {
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
    },
  },
};
