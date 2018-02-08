/**
 * @module Vertical List
 * @typicalname CVlist
 *
 *
 * @desc Container that displays its children as a vertical list
 * Each child has its width set to 100% of Vertical list
 * @group containers
 *
 * @property {String} group Component group
 * @property {String} type Component type used as a component tag
 * @property {String} name Component name
 * @property {String} icon Material icon name
 * @property {Array} children List of possible children groups
 * @property {Object} options
 *
 * @example {
 *  group: 'containers',
 *  type: 'vlist',
 *  name: 'Vertical List',
 *  icon: 'view_week',
 *  children: [
 *    'containers',
 *    'widgets',
 *  ],
 *  options: {
 *    color: {
 *      type: 'input',
 *      name: 'Color',
 *      value: 'transparent',
 *      validation: {
 *        required: true,
 *        minLength: 3,
 *        maxLength: 25,
 *      },
 *      priority: 1,
 *    },
 *    flat: {
 *      type: 'check',
 *      name: 'No shadow',
 *      value: false,
 *      priority: 2,
 *    },
 *    gutter: {
 *      type: 'check',
 *      name: 'Spacing',
 *      value: false,
 *      priority: 3,
 *    },
 *  },
 * }
 */

export default {
  group: 'containers',
  type: 'vlist',
  name: 'Vertical List',
  icon: 'view_stream',
  children: [
    '*',
    '!inputs',
  ],

  /**
   * @type {Object}
   * @desc Object containing options for component customization
   */
  options: {
    /**
     * @type {Object}
     * @property {String} type Color input field type
     * @property {String} name Color input field name/placeholder
     * @property {String} value Color input field default value
     * @property {Object} validation Validation rules for color input field
     * @property {Number} priority Color input field priority
     */
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

    /**
     * @type {Object}
     * @property {String} type Flat input field type
     * @property {String} name Flat input field name/placeholder
     * @property {String} value Flat input field default value
     * @property {Object} validation Validation rules for flat input field
     * @property {Number} priority Flat input field priority
     */
    flat: {
      type: 'check',
      name: 'No Shadow',
      value: false,
      priority: 2,
    },

    /**
     * @type {Object}
     * @property {String} type Gutter input field type
     * @property {String} name Gutter input field name/placeholder
     * @property {String} value Gutter input field default value
     * @property {Object} validation Validation rules for gutter input field
     * @property {Number} priority Gutter input field priority
     */
    gutter: {
      type: 'check',
      name: 'Spacing',
      value: false,
      priority: 3,
    },
  },
};
