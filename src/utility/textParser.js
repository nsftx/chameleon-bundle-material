import VTextField from 'vuetify/es5/components/VTextField';

const getProps = (definition) => {
  const props = {
    label: definition.label,
    placeholder: definition.placeholder,
    prependIcon: definition.prependIcon,
  };

  return props;
};

const getAttrs = (definition) => {
  const attrs = {
    name: definition.name,
  };

  return attrs;
};

export default {
  parse(definition) {
    return {
      base: VTextField,
      options: {
        props: getProps(definition),
        attrs: getAttrs(definition),
      },
    };
  },
};
