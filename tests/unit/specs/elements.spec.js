import { each, assign } from 'lodash';
import { mount, createLocalVue } from '@vue/test-utils';
import { createRenderer } from 'vue-server-renderer';
import sinon from 'sinon';

import Vuetify from 'vuetify';
import Vue from 'vue';
import VueRouter from 'vue-router';
import * as components from '@components';
import CPicker from '../../../src/components/CPicker';

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

// Vuetify tests
const expansionPanelProvide = () => ({
  data: {},
  focusable: true,
  panelClick: () => null,
  register: () => null,
});

describe('AllComponents', () => {
  // Set div with data-app attribute for components to use as wrapper
  // Vuetify warning
  const app = document.createElement('div');
  app.setAttribute('data-app', true);
  document.body.appendChild(app);

  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(VueRouter);
  // Unknown custom element: <c-picker>
  localVue.use(CPicker, options);

  const router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: {
          template: '<div><h2>Home</h2></div>',
        },
      },
    ],
  });

  // Vuetify global options
  Vue.prototype.$vuetify = {
    application: {},
    breakpoint: {},
    dark: false,
    icons: {},
    lang: [],
    options: [],
    rtl: [],
    theme: [],
    goTo: () => { },
    t: () => null,
  };

  localVue.prototype.$chameleon = {};

  // const router = new VueRouter();
  each(components, (component, key) => {
    const renderer = createRenderer();
    const spyDestroy = sinon.stub();
    const spyLoadData = sinon.stub();

    localVue.use(component, options);

    const cmpName = key.split(/(?=[A-Z])/).join('-').toLowerCase();
    const cmp = localVue.options.components[cmpName];
    const cmpDefinition = mockDefinition[cmpName];
    if (!cmpDefinition) return;

    const type = cmpDefinition._schema.type;
    const group = cmpDefinition._schema.group;
    const definition = assign({ type }, cmpDefinition);

    const wrapper = mount(cmp, {
      localVue,
      Vuetify,
      router,
      propsData: {
        definition,
      },
      provide: {
        cEntity: {
          fields: () => [],
          register: () => null,
        },
        expansionPanel: expansionPanelProvide(),
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
          expect(output).toMatchSnapshot();
          done();
        });
      });
    });
  });
});
