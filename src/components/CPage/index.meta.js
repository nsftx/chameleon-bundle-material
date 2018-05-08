export default {
  type: 'page',
  name: 'Page',
  icon: 'browser',
  actions: [
    {
      name: 'navigateToPage',
      data: {
        page: {
          name: 'Page',
          type: 'select',
          valueType: 'string',
          items: '$app.pages',
          itemValue: 'path',
          itemText: 'name',
        },
      },
    },
  ],
  events: [
    { name: 'Loading' },
  ],
  optionGroups: {
    meta: {
      key: 'meta',
      name: 'Meta',
    },
  },
  options: {
    name: {
      type: 'input',
      name: 'Name',
      value: null,
      priority: 1,
    },
    path: {
      type: 'input',
      name: 'Path',
      value: '/',
      priority: 2,
    },
    parent: {
      type: 'select',
      name: 'Parent',
      value: null,
      displayProp: 'name',
      valueProp: 'name',
      items: [],
      priority: 3,
    },
    meta: {
      type: 'group',
      group: 'meta',
      title: {
        type: 'input',
        name: 'Title',
        value: null,
      },
      description: {
        type: 'input',
        name: 'Description',
        value: null,
      },
      keywords: {
        type: 'input',
        name: 'Keywords',
        value: null,
      },
    },
  },
};
