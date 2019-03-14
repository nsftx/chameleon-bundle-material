import { isNil } from 'lodash';
import { binding } from '@utility';

const itemInterface = [
  {
    name: 'html',
    type: 'String',
    label: 'Html',
  },
];

const expressionImport = {
  imports: {
    isNil,
  },
};

export default {
  group: 'widgets',
  type: 'html',
  name: 'Html',
  icon: 'code',
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
        expression: binding.setExpression('<%= !isNil(element.dataSource) %>', expressionImport),
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
        expression: binding.setExpression('<%= !isNil(element.value) && element.value.length > 0 %>', expressionImport),
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
