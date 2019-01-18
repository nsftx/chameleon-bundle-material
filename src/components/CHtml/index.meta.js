import { binding } from '@nsoft/chameleon-sdk/src/utility';

const itemInterface = [
  {
    name: 'html',
    type: 'String',
    label: 'Html',
  },
];

export default {
  group: 'widgets',
  type: 'html',
  name: 'Html',
  icon: 'code',
  optionGroups: {
    data: {
      key: 'data',
      name: 'Data',
    },
  },
  actions: [
    {
      name: 'setDataSource',
      help: 'Sets text data source from event data',
    },
  ],
  events: [
    {
      name: 'DataSourceChanged',
      help: 'Fires when text data source is changed',
    },
  ],
  options: {
    color: true,
    theme: true,
    value: {
      type: 'inputList',
      group: 'data',
      name: 'HTML Code',
      value: null,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= element.dataSource != null %>'),
      },
      priority: 2,
    },
    dataSource: {
      type: 'dataSource',
      group: 'data',
      name: 'HTML Data Source',
      value: null,
      schema: itemInterface,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= element.value != null && element.value.length > 0 %>'),
      },
      priority: 1,
    },
    allowUnsafe: {
      type: 'check',
      name: 'Allow Unsafe',
      value: false,
      priority: 2,
    },
  },
};
