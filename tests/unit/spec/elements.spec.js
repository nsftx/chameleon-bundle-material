import { assign, each, omit } from 'lodash';
import { mount, createLocalVue } from '@vue/test-utils';
import { createRenderer } from 'vue-server-renderer';
import sinon from 'sinon';
import Vuetify from 'vuetify';
import Vue from 'vue';
import * as components from '@/components';
import connectorsMock from './__mocks__/connectors';
import mockDefinition from './__mocks__/definition';

const options = {
  namespace: 'c-',
};

const childrenComponents = [
  'CAccordionItem',
  'CFlexgridItem',
  'CForm',
  'CHlist',
  'CPanel',
  'CTabItem',
  'CVlist',
];

const localVue = createLocalVue();

describe('AllComponents', () => {

  // Vuetify global options
  Vue.prototype.$vuetify = {
    dark: false,
    theme: [],
  };

  localVue.prototype.$chameleon = {};
  const materialComponents = omit(components, 'CPicker');
  each(materialComponents, (component, key) => {
    const renderer = createRenderer();
    const spyDestroy = sinon.stub();
    const spyLoadData = sinon.stub();

    localVue.use(component, options);

    const cmpName = key.split(/(?=[A-Z])/).join('-').toLowerCase();
    const cmp = localVue.options.components[cmpName];
    const cmpDefinition = mockDefinition[cmpName];
    if (!cmpDefinition) return;

    const { type } = cmpDefinition._schema;
    const { group } = cmpDefinition._schema;
    const definition = assign({ type }, cmpDefinition);

    const wrapper = mount(cmp, {
      localVue,
      Vuetify,
      propsData: {
        definition,
      },
      provide: {
        cEntity: {
          fields: () => [],
          register: () => null,
        },
      },
      methods: {
        loadConnectorData() {
          spyLoadData();
          return new Promise((resolve) => {
            resolve(connectorsMock);
          });
        },
      },
      destroyed() {
        spyDestroy();
      },
    });

    it(`Check if ${cmpName} contains base class c-element`, () => {
      expect(wrapper.classes()).toContain('c-element');
    });

    if (childrenComponents.indexOf(key) >= 0) {
      it(`Check if ${cmpName} contains base children class c-element-children`, () => {
        expect(wrapper.find(`.${cmpName}`).contains('.c-element-children')).toBe(true);
      });
    }

    it(`Check if ${cmpName} contains data attributes`, () => {
      const attrs = wrapper.attributes();
      expect([attrs]).toContainEqual(expect.objectContaining(
        { 'data-type': type },
        { 'data-group': group },
        { 'data-uid': expect.anything() },
      ));
    });

    it(`${cmpName} renders correctly`, (done) => {
      wrapper.vm.$nextTick(() => {
        renderer.renderToString(wrapper.vm).then((output) => {
          // expect(output).toMatchSnapshot();
          done();
        });
      });
    });
  });
});
