export default {
  group: 'widgets',
  type: 'table',
  name: 'Table',
  icon: 'grid_on',
  options: {
    color: {
      type: 'input',
      name: 'Color',
      value: 'white',
      priority: 1,
    },
    flat: {
      type: 'check',
      name: 'No Shadow',
      value: false,
      priority: 2,
    },
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'Data Source',
      value: null,
      priority: 3,
    },
  },
};
