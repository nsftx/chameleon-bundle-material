export default {
  local: {
    name: 'local',
    type: 'internalLocal',
    description: 'Local Connector',
    disabled: false,
    options: {
      endpoint: 'https://chameleon.nsoft.com/data',
    },
    sources: {
      populationsPerAge: {
        name: 'populationsPerAge',
        id: 'populationsPerAge',
        model: 'PopulationPerAge',
      },
      populationsPerAgeState: {
        name: 'populationsPerAgeState',
        id: 'populationsPerAgeState',
        model: 'PopulationPerAgeState',
      },
      temperaturesPerCity: {
        name: 'temperaturesPerCity',
        id: 'temperaturesPerCity',
        model: 'TemperaturePerCity',
      },
      flowerCategorisations: {
        name: 'flowerCategorisations',
        id: 'flowerCategorisations',
        model: 'FlowersCategorisation',
      },
    },
  },
};
