import { isNil } from 'lodash';
import { binding } from '@utility';

const itemInterface = [
  {
    name: 'text',
    type: 'String',
    label: 'Text',
  },
];

const expressionImport = {
  imports: {
    isNil,
  },
};

export default {
  group: 'inputs',
  type: 'text-area',
  name: 'Text Area',
  icon: 'text_fields',
  optionGroups: {
    data: {
      key: 'data',
      name: 'Data',
    },
    validation: {
      key: 'validation',
      name: 'Validation',
    },
  },
  actions: [
    {
      name: 'setDataSource',
      help: 'Sets text data source from event data',
    },
    {
      name: 'setInputValue',
      help: 'Input field updated',
    },
    {
      name: 'setItemDisabledValue',
      help: 'Input field disabled value',
    },
  ],
  events: [
    {
      name: 'DataSourceChanged',
      help: 'Fires when text data source is changed',
    },
    {
      name: 'Changed',
      help: 'Input changed',
    },
    {
      name: 'Cleared',
      help: 'Input cleared / reset',
    },
    {
      name: 'FocusedIn',
      help: 'Input focused',
    },
    {
      name: 'FocusedOut',
      help: 'Input focused out / blurred',
    },
  ],
  options: {
    color: true,
    name: {
      type: 'fieldNameInput',
      name: 'Input Name',
      value: null,
      priority: 1,
      validation: {
        required: true,
      },
    },
    label: {
      type: 'input',
      name: 'TextBox Label',
      value: 'Text Field',
      priority: 2,
    },
    prependIcon: {
      type: 'iconSource',
      name: 'Prepend Icon',
      value: null,
      priority: 3,
    },
    appendIcon: {
      type: 'iconSource',
      name: 'Append Icon',
      value: null,
      priority: 4,
    },
    autoGrow: {
      type: 'check',
      name: 'Auto Grow',
      value: false,
      priority: 6,
    },
    outline: {
      type: 'check',
      name: 'Outline',
      value: false,
      priority: 7,
    },
    rows: {
      type: 'input',
      name: 'Number of Rows',
      value: 5,
      priority: 5,
    },
    tooltip: {
      type: 'input',
      name: 'Tooltip Text',
      value: null,
      priority: 8,
    },
    clearable: {
      type: 'check',
      name: 'Enable Input Reset',
      value: false,
      priority: 9,
    },
    disabled: {
      type: 'check',
      name: 'Disable Input',
      value: false,
      priority: 10,
    },
    value: {
      type: 'inputList',
      group: 'data',
      name: 'Input Source',
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
      name: 'Data Source',
      value: null,
      schema: itemInterface,
      disabled: {
        current: false,
        default: false,
        expression: binding.setExpression('<%= !isNil(element.value) && element.value.length > 0 %>', expressionImport),
      },
      priority: 1,
    },
    validation: {
      type: 'group',
      group: 'validation',
      required: {
        type: 'check',
        name: 'Required',
        value: false,
      },
    },
    theme: true,
  },
};
