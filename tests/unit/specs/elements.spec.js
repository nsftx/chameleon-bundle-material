import { each, assign } from 'lodash';
import { mount, createLocalVue } from 'vue-test-utils';
import { createRenderer } from 'vue-server-renderer';
import Vuetify from 'vuetify';
import * as components from '@components';

const mockDefinition = require('./__mocks__/definition');

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

describe('AllComponents', () => {
  // Set div with data-app attribute for components to use as wrapper
  const app = document.createElement('div');
  app.setAttribute('data-app', true);
  document.body.appendChild(app);

  each(components, (component, key) => {
    const renderer = createRenderer();
    const localVue = createLocalVue();
    localVue.use(component, options);
    localVue.use(Vuetify);

    const cmpName = Object.keys(localVue.options.components)[0];
    const cmp = localVue.options.components[cmpName];
    const cmpDefinition = mockDefinition[cmpName];

    if (!cmpDefinition) return;

    const type = cmpDefinition._schema.type;
    const group = cmpDefinition._schema.group;
    const definition = assign({ type }, cmpDefinition);

    const wrapper = mount(cmp, {
      // Required prop definition
      propsData: {
        definition,
      },
      // Some components require global validators
      mocks: {
        $chameleon: {
          validators: {},
        },
        form: {},
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
