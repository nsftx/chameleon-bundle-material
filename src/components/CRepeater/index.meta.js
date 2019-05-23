export default {
  group: 'widgets',
  type: 'repeater',
  name: 'Repeater',
  icon: 'featured_play_list',
  children: [
    '*',
  ],
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
    flat: {
      type: 'check',
      group: 'style',
      name: 'No Shadow',
      value: true,
    },
  },
};
