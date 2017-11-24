export default {
  render(createElement, context, definition, validator) {
    const self = context;

    return createElement(
      'c-date',
      {
        props: {
          definition,
          validators: context.validators,
          validator,
        },
        on: {
          input(value) {
            self.value = value;
          },
        },
      },
    );
  },
};
