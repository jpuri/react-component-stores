jest.dontMock('../updateStore');
jest.dontMock('../configureApp');
jest.dontMock('immutable');

const updateStore = require('../updateStore');
const configureApp = require('../configureApp');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

// import { updateAppState, configureStore } from '../configureStore';

describe('configureStore', () => {
  it('update state of composing component when updateAppState is called', () => {
    /* const component = () => {
      return (<div><div className="testClass1">**</div><div className="testClass2">###</div></div>);
    };
    const composingComponent = configureApp.configureStore(['data1'])(component);

    const renderer = TestUtils.createRenderer();

    const componentInstance = renderer.render(<div><div className="testClass1">**</div><div className="testClass2">###</div></div>);
    configureApp.updateAppState({ actionType: 'NEW', key: 'data1', value: 'testing1' });
    // const componentNode = TestUtils.findRenderedDOMComponentWithClass(componentInstance, 'testClass1');
    // console.warn('-------1', componentNode);
    console.warn('-------2', componentInstance.state);*/
  });
});
