import _concat from 'lodash/concat';
import _each from 'lodash/each';
import _map from 'lodash/map';

const getEntity = (form) => {
  const entity = {};
  _each(form.getInputs(), (input) => {
    const name = input.$attrs.name;
    if (name) {
      entity[name] = input.value;
    }
  });

  return entity;
};

const getValidationErrors = (form) => {
  let errors = [];
  _each(form.getInputs(), (input) => {
    if (input.errorBucket.length) {
      errors = _concat(errors, _map(input.errorBucket, error => error));
    }
  });

  return errors;
};

const getListeners = (context) => {
  const listeners = {};
  const formName = context.definition.name;

  // TODO: Listeners should be generated from definition
  // Listener handler should be generated from flow step
  listeners.save = () => {
    const form = context.$refs[formName];
    if (form.validate()) {
      console.log('Entity success =>', getEntity(form));
    } else {
      console.log('Entity error =>', getValidationErrors(form));
    }
  };

  return listeners;
};

export default {
  name: 'c-form',
  functional: false,
  props: {
    definition: {
      type: Object,
      required: true,
    },
    validators: {
      type: Object,
    },
  },
  render(createElement) {
    const context = this;
    // TODO: Extract children render function
    // Arrow funtion madness ahead
    return createElement(
      'v-card',
      {
        props: {
          color: 'transparent',
          flat: true,
        },
      },
      [
        createElement(
          'v-form',
          {
            ref: this.definition.name,
          },
          [
            createElement(
              'v-card-text',
              _map(this.definition.fields, (field) => {
                const self = this;
                return createElement('div',
                  {
                    // Dynamic key to disable component re-use
                    key: `${field.name}_${Date.now()}`,
                  },
                  [
                    createElement(
                      'c-field',
                      {
                        props: {
                          definition: field,
                          validators: this.validators,
                        },
                        // TODO: Expand field listeners if needed
                        // Should fileds be able to trigger flow?
                        on: {
                          input(value) {
                            const currentField = field;
                            currentField.value = value;
                            self.$emit('input', value);
                          },
                        },
                      },
                    ),
                  ]);
              }),
            ),
            createElement(
              'v-card-actions',
              _map(this.definition.actions, button => createElement('c-button',
                {
                  props: {
                    definition: button,
                  },
                  on: getListeners(context),
                },
              )),
            ),
          ],
        ),
      ],
    );
  },
};
