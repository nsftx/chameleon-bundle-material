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
};

export default {
  namespace,
  name: 'material',
  title: 'Material Bundle',
  elementGroups,
  elements,
  optionGroups,
};
