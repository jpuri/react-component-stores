import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';

describe('root', () => {
  it('renders without problems', () => {
    const div = TestUtils.renderIntoDocument(<div/>);
    expect(div).toExist();
  });
});
