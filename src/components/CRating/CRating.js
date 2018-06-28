import { isNil, map } from 'lodash';
import { fieldable, validatable } from '@mixins';
import Element from '../Element';

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
  self.config.color = self.config.color || 'blue';

  const el = createElement(
    'v-icon',
    {
      staticClass: 'px-1',
      key: `icon-${index}`,
      props: {
        color: self.fillLevel >= index ? self.config.color : self.config.baseColor,
      },
      on: {
        mouseenter() {
          self.fillLevel = index;
        },
        mouseleave() {
          self.setRating(self.value);
        },
        click() {
          self.value = index;
          self.setRating(self.value, true);
          self.$emit('input', self.value);
          self.sendToEventBus('Changed', { value: self.value });
        },
      },
    },
    context.config.icon || 'star',
  );

  return el;
};

const getPropRequired = (config) => {
  if (config.validation) {
    return !!config.validation.required;
  }

  return false;
};

const getTitle = (createElement, context) => {
  const hasLabel = context.config.label || isNil(context.config.label);
  if (!hasLabel && !context.value) return false;

  const required = getPropRequired(context.config);
  let title = isNil(context.config.label) ? '' : context.config.label;
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
  extends: Element,
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
    setRating(value, validate) {
      this.fillLevel = value;
      if (validate) this.validate();
    },
  },
  render(createElement) {
    const self = this;
    const ratingCount = new Array(this.config.maxRating || 5);
    const icons = map(ratingCount, (item, idx) => getIconElement(createElement, idx + 1, self));
    const title = getTitle(createElement, self);
    const message = getMessage(createElement, self);

    const data = {
      class: {
        'rating--error': this.hasError,
        'text-xs-center': true,
      },
      props: {
        flat: true,
      },
    };

    const children = [
      title,
      createElement(
        'v-input',
        {
          on: {
            input(e) {
              if (isNil(e)) {
                self.value = null;
                self.setRating(0, true);
              }
            },
          },
          class: {
            'd-inline-block': true,
          },
        },
        icons,
      ),
      message,
    ];

    return this.renderElement('v-card', data, children);
  },
  mounted() {
    this.fillLevel = parseInt(this.value, 10);
    this.value = this.config.value || null;
  },
};
