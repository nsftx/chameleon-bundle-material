export default {
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
