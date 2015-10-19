/* global jest, describe, it, expect */

jest.dontMock('../TestTextWidget');

describe('TestTextWidget', () => {
  const React = require('react');
  const ReactDOM = require('react-dom');
  const TestUtils = require('react-addons-test-utils');

  const TestTextWidget = require('../TestTextWidget');

  it('renders text', () => {
    const textWidget = TestUtils.renderIntoDocument(
      <TestTextWidget
        value="Test value"
        onChange={ () => {} }
      />
    );

    const input = TestUtils.findRenderedDOMComponentWithTag(
      textWidget, 'input'
    );

    expect(ReactDOM.findDOMNode(input).value).toEqual('Test value');
  });

  it('fires a change event', () => {
    const changeHandler = jest.genMockFunction();

    const textWidget = TestUtils.renderIntoDocument(
      <TestTextWidget
        value="Test value"
        onChange={ changeHandler }
      />
    );

    const input = TestUtils.findRenderedDOMComponentWithTag(
      textWidget, 'input'
    );

    TestUtils.Simulate.change(input, { target: { value: 'Other value' } });

    expect(changeHandler.mock.calls.length).toBe(1);
    expect(changeHandler.mock.calls[0][0]).toEqual('Other value');
  });
});
