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
      value: null,
    };
  },
  mounted() {
    this.value = this.definition.value;
  },
};
