export default {
  type: 'page',
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
  options: null,
  hidden: true,
};
