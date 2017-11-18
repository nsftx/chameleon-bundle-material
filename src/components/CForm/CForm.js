import _each from 'lodash/each';
import _map from 'lodash/map';

const getListeners = (context) => {
  const listeners = {};
  const form = context.definition.name;

  // TODO: Listeners should be generated from definition
  // Listener handler should be generated from flow step
  // Flow step should define if validation is required, etc.
  listeners.save = () => {
    if (context.$refs[form].validate()) {
      const entity = {};
      _each(context.$refs[form].getInputs(), (input) => {
        entity[input.$attrs.name] = input.value;
      });

      console.log('Entity =>', entity);
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
                    key: field.name,
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
              _map(this.definition.buttons, button => createElement('c-button',
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
