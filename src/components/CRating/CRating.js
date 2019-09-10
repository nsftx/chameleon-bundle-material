import { isNil, isObject } from 'lodash';
import { fieldable, validatable } from '@/mixins';
import { validator } from '@/validators';
import Element from '../Element';

require('../../style/components/_rating.scss');

const getPropRequired = (config) => {
  if (config.validation) {
    return !!config.validation.required;
  }
  return false;
};

const getRatingProps = (context) => {
  const self = context;
  const { config } = context;

  return {
    props: {
      backgroundColor: config.backgroundColor || 'accent',
      color: config.color || 'primary',
      emptyIcon: config.emptyIcon || 'star_border',
      fullIcon: config.fullIcon || 'star',
      halfIcon: config.halfIcon || 'star_half',
      halfIncrements: config.halfIncrements || false,
      length: config.maxRating || '5',
      readonly: config.readonly,
      hover: config.hover,
      value: self.value || 0,
    },
    on: {
      input(value) {
        self.value = value;
        self.$emit('input', self.value);
        self.sendToEventBus('Changed', { value: self.value });
      },
    },
  };
};

const getHiddenInput = (createElement, context) => {
  // Fake input, for c-form model
  const self = context;
  const { config } = self;
  return createElement('v-input',
    {
      attrs: {
        name: self.config.name || 'rating',
      },
      props: {
        value: self.value || null,
        required: getPropRequired(config),
        rules: validator.getRules(config, self.validators),
      },
      staticClass: 'text-xs-center',
      on: {
        input(value) {
          self.value = value;
        },
      },
    });
};

const getRating = (createElement, context) => createElement('v-rating', getRatingProps(context));

const getTitle = (createElement, context) => {
  const hasLabel = context.config.label || isNil(context.config.label);

  if (!hasLabel && !context.value) return false;

  const required = getPropRequired(context.config);
  let title = isNil(context.config.label) ? '' : context.config.label;

  if (context.value && context.config.ratingInfo) {
    title = `${title} (${context.value})`;
  }

  if (required) {
    title = `${title}*`;
  }
  return createElement(
    'div',
    title,
  );
};

const getRatingChildren = (context, createElement) => [
  getTitle(createElement, context),
  getRating(createElement, context),
  getHiddenInput(createElement, context),
];

export default {
  extends: Element,
  mixins: [
    fieldable,
    validatable,
  ],
  methods: {
    setRating(context) {
      this.value = isObject(context) ? context.value : context;
      this.$emit('input', this.value);
    },
  },
  render(createElement) {
    const self = this;
    const data = {
      class: {
        'text-xs-center': true,
      },
      props: {
        dark: self.isThemeDark,
        light: self.isThemeLight,
        flat: true,
      },
    };
    const children = getRatingChildren(self, createElement);
    return this.renderElement('v-card', data, children);
  },
};
