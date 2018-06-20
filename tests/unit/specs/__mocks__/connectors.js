export default {
  local: {
    name: 'local',
    type: 'internalLocal',
    description: 'Local Connector',
    disabled: false,
    options: {
      endpoint: 'https://chameleon.nsoft.com/static/data',
    },
    sources: {
      populationPerAge: {
        name: 'populationPerAge',
        model: 'PopulationPerAge',
      },
      populationPerAgeState: {
        name: 'populationPerAgeState',
        model: 'PopulationPerAgeState',
      },
      temperaturesPerCity: {
        name: 'temperaturesPerCity',
        model: 'TemperaturePerCity',
      },
      flowersCategorisation: {
        name: 'flowersCategorisation',
        model: 'FlowersCategorisation',
      },
    },
  },
};
