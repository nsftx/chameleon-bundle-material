export default {
  data() {
    return {
      name: null,
      value: null,
    };
  },
  mounted() {
    this.value = this.config.value;
    this.name = this.config.name;
  },
};
