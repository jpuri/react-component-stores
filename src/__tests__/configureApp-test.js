jest.dontMock('../updateStore');
jest.dontMock('../configureApp');
jest.dontMock('immutable');

const configureApp = require('../configureApp');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Component1 = (props) =>
  <div>{ props.store.get('data1') ? props.store.get('data1') : '*****' }</div>;

const ComposedComponent = configureApp.configureStore(['data1'])(Component1);

describe('configureStore', () => {
  it('update state of composing component when updateComponentStores is called', () => {
    const componentInstance = TestUtils.renderIntoDocument(<ComposedComponent />);
    const componentNode = TestUtils.scryRenderedDOMComponentsWithTag(componentInstance, 'div');
    expect(componentNode[0].innerHTML).toBe('*****');
    configureApp.updateComponentStores('NEW', 'data1', 'testing1');
    expect(componentNode[0].innerHTML).toBe('testing1');
  });

  it('should update store of even newly added component', () => {
    configureApp.updateComponentStores('NEW', 'data1', 'testing1');
    const componentInstance = TestUtils.renderIntoDocument(<ComposedComponent />);
    const componentNode = TestUtils.scryRenderedDOMComponentsWithTag(componentInstance, 'div');
    expect(componentNode[0].innerHTML).toBe('testing1');
  });
});
