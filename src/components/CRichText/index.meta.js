export default {
  group: 'inputs',
  type: 'rich-text',
  name: 'Rich Text',
  icon: 'text_format',
  options: {
    toolbar: {
      type: 'radioList',
      name: 'Select RichText type',
      value: 'default',
      items: [
        {
          value: 'default',
          lalbel: 'Default',
        },
        {
          value: 'mini',
          lalbel: 'Mini',
        },
        {
          value: 'basic',
          label: 'Basic',
        },
        {
          value: 'advanced',
          label: 'Advanced',
        },
        {
          value: 'full',
          label: 'Full',
        },
      ],
    },
  },
};
