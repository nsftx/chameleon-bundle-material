import _ from 'lodash';
import namespace from '@namespace';
import { fieldable, validatable } from '@mixins';

require('../../style/components/_rating.styl');

const getMessage = (createElement, context) => {
  const el = createElement(
    'div',
    {
      staticClass: 'rating__message',
    },
    context.errorBucket[0],
  );

  return el;
};

const getIconElement = (createElement, index, context) => {
  const self = context;

  const el = createElement(
    'v-icon',
    {
      staticClass: 'px-1',
      key: `icon-${index}`,
      props: {
        color: self.fillLevel >= index ? 'primary' : '',
      },
      on: {
        mouseenter() {
          self.fillLevel = index;
        },
        mouseleave() {
          self.setRating();
        },
        click() {
          self.value = index;
          self.setRating(true);
          self.$emit('input', self.value);
        },
      },
    },
    context.definition.icon || 'star',
  );

  return el;
};

const getPropRequired = (definition) => {
  if (definition.validation) {
    return !!definition.validation.required;
  }

  return false;
};

const getTitle = (createElement, context) => {
  const hasLabel = context.definition.label || _.isNil(context.definition.label);
  if (!hasLabel && !context.value) return false;

  const required = getPropRequired(context.definition);
  let title = _.isNil(context.definition.label) ? '' : context.definition.label;
  if (context.value) {
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

export default {
  name: `${namespace}rating`,
  mixins: [
    fieldable,
    validatable,
  ],
  data() {
    return {
      fillLevel: 0,
    };
  },
  methods: {
    setRating(validate) {
      this.fillLevel = this.value;
      if (validate) this.validate();
    },
  },
  render(createElement) {
    const self = this;
    const ratingCount = new Array(this.definition.maxRating || 5);
    const icons = _.map(ratingCount, (item, idx) => getIconElement(createElement, idx + 1, self));
    const title = getTitle(createElement, self);
    const message = getMessage(createElement, self);

    return createElement(
      'div',
      {
        staticClass: `${this.$options.name} text-xs-center`,
        class: {
          'rating--error': this.hasError,
        },
      },
      [
        title,
        createElement(
          'div',
          icons,
        ),
        message,
      ],
    );
  },
  mounted() {
    this.fillLevel = parseInt(this.value, 10);
    this.value = this.definition.value || null;
  },
};
