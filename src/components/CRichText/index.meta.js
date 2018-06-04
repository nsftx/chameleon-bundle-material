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
  events: [
    {
      name: 'Changed',
      help: 'Text input changed',
    },
    {
      name: 'FocusedIn',
      help: 'Focused in',
    },
    {
      name: 'FocusedOut',
      help: 'Focused out / Blurred',
    },
  ],
  options: {
    name: {
      type: 'input',
      name: 'Input Name',
      value: null,
      priority: 1,
    },
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
      priority: 2,
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
