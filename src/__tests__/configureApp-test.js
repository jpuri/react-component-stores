jest.dontMock('../updateStore');
jest.dontMock('../configureApp');
jest.dontMock('immutable');

const configureApp = require('../configureApp');

import React, {Component} from 'react';
import TestUtils from 'react-addons-test-utils';

class Component1 extends Component {
  render() {
    return (
      <div>{ this.props.store.get('data1') ? this.props.store.get('data1') : '*****' }</div>
    );
  }
}

const ComposedComponent = configureApp.configureStore(['data1'])(Component1);

describe('configureStore', () => {
  it('update state of composing component when updateAppState is called', () => {
    const componentInstance = TestUtils.renderIntoDocument(<ComposedComponent/>);
    const componentNode = TestUtils.scryRenderedDOMComponentsWithTag(componentInstance, 'div');
    expect(componentNode[0].innerHTML).toBe('*****');
    configureApp.updateAppState({ actionType: 'NEW', key: 'data1', value: 'testing1' });
    expect(componentNode[0].innerHTML).toBe('testing1');
  });
});
