import { assign } from 'lodash';

export default {
  computed: {
    dataSource() {
      return this.definition.dataSource;
    },
    dataConnector() {
      return this.dataSource.connector;
    },
  },
  methods: {
    loadConnectorData() {
      return new Promise((resolve) => {
        if (!this.dataConnector) {
          resolve(this.dataSource);
          return this.dataSource;
        }

        const connector = assign({},
          this.dataConnector,
          this.$chameleon.connectors[this.dataConnector.name],
        );

        const source = assign({
          schema: this.dataSource.schema,
        }, connector.sources[this.dataSource.name]);

        return this.$chameleon.connector.getSourceData(
          connector,
          source,
        ).then((result) => {
          this.$set(this.dataSource, 'items', result.items);
          return this.dataSource;
        });
      });
    },
  },
  mounted() {
    this.loadConnectorData();
  },
};
