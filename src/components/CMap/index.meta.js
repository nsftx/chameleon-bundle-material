export default {
  group: 'widgets',
  type: 'map',
  name: 'Map',
  icon: 'place',
  options: {
    apiKey: {
      type: 'input',
      name: 'Api Key',
    },
    libraries: {
      type: 'input',
      name: 'Map Libraries',
    },
    width: {
      type: 'input',
      name: 'Map width',
    },
    height: {
      type: 'input',
      name: 'Map height',
    },
  },
};
