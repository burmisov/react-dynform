/* global jest, describe, it, expect */

jest.dontMock('../DynForm');

describe('DynForm', () => {
  it('contains what is expected', () => {
    const React = require('react/addons');
    const DynForm = require('../DynForm');
    const TestUtils = React.addons.TestUtils;

    const dynForm = TestUtils.renderIntoDocument(
      <DynForm />
    );

    const span = TestUtils.findRenderedDOMComponentWithTag(
      dynForm, 'span'
    );

    expect(React.findDOMNode(span).textContent).toEqual('TODO');
  });
});
