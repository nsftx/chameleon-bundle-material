export default {
  props: {
    definition: {
      type: Object,
      required: true,
    },
    validators: {
      type: Object,
    },
  },
  data() {
    return {
      name: null,
      value: null,
    };
  },
  mounted() {
    this.value = this.definition.value;
    this.name = this.definition.name;
  },
};
