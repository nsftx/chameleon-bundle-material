import { isNil } from 'lodash';
import { binding } from '@utility';

const expressionImport = {
  imports: {
    isNil,
  },
};

const itemInterface = [
  {
    name: 'text',
    type: 'String',
    label: 'Text',
  },
];

export default {
  group: 'inputs',
  type: 'text-input',
  name: 'Text Input',
  icon: 'title',
  optionGroups: {
    description: {
      key: 'description',
      name: 'Description',
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
      name: 'AppendIconClicked',
      help: 'On Append icon click',
    },
    {
      name: 'PrependIconClicked',
      help: 'On Prepend icon click',
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
  contextOptions: {
    type: {
      name: 'Type',
      options: 'subtype',
    },
  },
  options: {
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
      name: 'Label',
      value: 'Text Field',
      priority: 2,
    },
    clearable: {
      type: 'check',
      name: 'Input Reset',
      value: false,
      priority: 3,
    },
    disabled: {
      type: 'check',
      name: 'Disable Input',
      value: false,
      priority: 4,
    },
    readonly: {
      type: 'check',
      name: 'Readonly',
      value: false,
      priority: 5,
    },
    mask: {
      type: 'select',
      name: 'Phone Mask',
      value: '',
      hidden: true,
    },
    subtype: {
      type: 'select',
      name: 'Text Input Type',
      items: [
        {
          label: 'Generic',
          value: 'generic',
          options: {},
        },
        {
          label: 'Email',
          value: 'email',
          options: {
            style: {
              prependIcon: {
                value: 'email',
              },
            },
            validation: {
              pattern: {
                key: 'pattern',
                type: 'input',
                name: 'Email pattern',
                value: '^[a-zA-Z0-9.!#$%&\'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$',
                disabled: true,
              },
            },
          },
        },
        {
          label: 'Money',
          value: 'money',
          options: {
            style: {
              suffix: {
                value: '$',
              },
            },
          },
        },
        {
          label: 'Number',
          value: 'number',
          options: {
            style: {
              prependIcon: {
                value: 'unfold_more',
              },
            },
          },
        },
        {
          label: 'Percentage',
          value: 'percentage',
          options: {
            style: {
              appendIcon: {
                value: '%',
              },
            },
          },
        },
        {
          label: 'Phone',
          value: 'phone',
          options: {
            style: {
              prependIcon: {
                value: 'phone',
              },
            },
            mask: {
              type: 'select',
              name: 'Phone Mask',
              group: 'general',
              items: [
                {
                  label: 'None',
                  value: '',
                },
                {
                  label: 'Phone (###) ### - ####',
                  value: 'phone',
                },
                {
                  label: 'Phone +### ## ### ###',
                  value: '+### ## ### ###',
                },
              ],
              displayProp: 'label',
              valueProp: 'value',
              value: '+### ## ### ###',
              hidden: false,
            },
          },
        },
        {
          label: 'Url',
          value: 'url',
          options: {
            style: {
              prependIcon: {
                value: 'link',
              },
            },
            validation: {
              urlValidator: {
                key: 'urlValidator',
                type: 'check',
                name: 'Url Validator',
                value: true,
                disabled: true,
              },
            },
          },
        },
        {
          label: 'Password',
          value: 'password',
          options: {
            style: {
              appendIcon: {
                value: 'visibility',
              },
              prependIcon: {
                value: 'lock',
              },
            },
            description: {
              persistentHint: {
                key: 'persistentHint',
                type: 'check',
                name: 'Persisstent Hint',
                value: true,
                disabled: true,
              },
              hint: {
                value: 'At least 8 characters long, 1 lowercase letter, 1 capital letter, 1 number and 1 special character',
              },
            },
            validation: {
              pattern: {
                key: 'pattern',
                type: 'input',
                name: 'Password pattern',
                value: '^(?=.*[\\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\\w!@#$%^&*]{8,}$',
              },
            },
          },
        },
      ],
      displayProp: 'label',
      valueProp: 'value',
      value: 'generic',
      returnObject: true,
      hint: 'Changing TextBox type will reset other fields',
      persistentHint: true,
    },
    description: {
      type: 'group',
      group: 'description',
      hint: {
        type: 'input',
        name: 'Hint Text',
        value: null,
      },
      tooltip: {
        type: 'input',
        name: 'Tooltip Text',
        value: null,
      },
      placeholder: {
        type: 'input',
        name: 'Placeholder Text',
        value: null,
      },
    },
    value: {
      type: 'input',
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
    style: {
      type: 'group',
      group: 'style',
      color: {
        type: 'colorPicker',
        name: 'Color',
        value: null,
      },
      theme: {
        type: 'select',
        name: 'Theme',
        items: '=$themes',
        value: null,
      },
      prependIcon: {
        type: 'iconSource',
        name: 'Prepend Icon',
        value: null,
      },
      appendIcon: {
        type: 'iconSource',
        name: 'Append Icon',
        value: null,
      },
      prefix: {
        type: 'input',
        name: 'Prefix',
        value: null,
      },
      suffix: {
        type: 'input',
        name: 'Suffix',
        value: null,
      },
    },
    validation: {
      type: 'group',
      group: 'validation',
      required: {
        type: 'check',
        name: 'Enable required',
        value: false,
      },
      minLength: {
        type: 'input',
        name: 'Min Length',
        value: null,
      },
      maxLength: {
        type: 'input',
        name: 'Max Length',
        value: null,
      },
    },
  },
};
