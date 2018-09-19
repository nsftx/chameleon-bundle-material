export default {
  group: 'widgets',
  type: 'map',
  name: 'Map',
  icon: 'place',
  options: {
    apiKey: {
      type: 'input',
      name: 'Api Key',
      value: null,
      validation: {
        required: true,
      },
    },
    libraries: {
      type: 'input',
      name: 'Map Libraries',
      value: null,
    },
  },
};
