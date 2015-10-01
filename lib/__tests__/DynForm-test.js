/* global jest, describe, it, expect */

jest.dontMock('../DynForm');

describe('DynForm', () => {
  it('contains what is expected', () => {
    const React = require('react/addons');
    const TestUtils = React.addons.TestUtils;

    const DynForm = require('../DynForm');
    const TestRenderer = require('../utils/TestRenderer');

    const dynForm = TestUtils.renderIntoDocument(
      <DynForm
        renderer={ TestRenderer }
      />
    );

    const span = TestUtils.findRenderedDOMComponentWithTag(
      dynForm, 'span'
    );

    expect(React.findDOMNode(span).textContent).toEqual('TODO');
  });
});
