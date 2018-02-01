export default {
  group: 'inputs',
  type: 'rich-text',
  name: 'Rich Text',
  icon: 'text_format',
  optionGroups: {
    validation: {
      key: 'validation',
      name: 'Validation',
    },
  },
  options: {
    toolbar: {
      type: 'select',
      name: 'Select RichText Type',
      value: {
        id: 1,
        value: 'default',
        label: 'Default',
      },
      displayProp: 'label',
      valueProp: 'value',
      items: [
        {
          id: 1,
          value: 'default',
          label: 'Default',
        },
        {
          id: 2,
          value: 'mini',
          label: 'Mini',
        },
        {
          id: 3,
          value: 'basic',
          label: 'Basic',
        },
        {
          id: 4,
          value: 'advanced',
          label: 'Advanced',
        },
        {
          id: 5,
          value: 'full',
          label: 'Full',
        },
      ],
    },
    validation: {
      type: 'group',
      group: 'validation',
      required: {
        type: 'check',
        name: 'Enable required',
        value: false,
      },
    },
  },
};
