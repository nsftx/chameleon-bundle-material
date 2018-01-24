/**
 * @name VerticalList
 *
 * Container that displays its children as a vertical list
 * Each child has set width to 100% of the Vertical list
 * @property {string} group Group of the container
 * @property {string} type Type of the container
 */

export default {
  group: 'containers',
  type: 'vlist',
  name: 'Vertical List',
  icon: 'view_week',
  children: [
    'containers',
    'widgets',
  ],
  options: {
    color: {
      type: 'input',
      name: 'Color',
      value: 'transparent',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 25,
      },
      priority: 1,
    },
    flat: {
      type: 'check',
      name: 'No shadow',
      value: false,
      priority: 2,
    },
    gutter: {
      type: 'check',
      name: 'Spacing',
      value: false,
      priority: 3,
    },
  },
};
