import namespace from './index.namespace';
import * as elements from './components/index.meta';

const elementGroups = {
  containers: {
    key: 'containers',
    name: 'Containers',
  },
  widgets: {
    key: 'widgets',
    name: 'Widgets',
  },
  inputs: {
    key: 'inputs',
    name: 'Inputs',
  },
  actions: {
    key: 'actions',
    name: 'Actions',
  },
  other: {
    key: 'other',
    name: 'Other',
  },
};

const optionGroups = {
  general: {
    key: 'general',
    name: 'General',
  },
  localization: {
    key: 'localization',
    name: 'Localization',
  },
  data: {
    key: 'data',
    name: 'Data',
  },
};

export default {
  namespace,
  name: 'material',
  title: 'Material Bundle',
  elementGroups,
  elements,
  optionGroups,
};
