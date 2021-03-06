/* global jest, describe, it, expect */

jest.dontMock('../TestRenderer');
jest.dontMock('../TestTextWidget');

describe('TestRenderer', () => {
  const React = require('react');
  const ReactDOM = require('react-dom');
  const TestUtils = require('react-addons-test-utils');

  const TestRenderer = require('../TestRenderer');
  const TestTextWidget = require('../TestTextWidget');

  it('renders test widget and wires events', () => {
    const testFields = [
      {
        name: 'widget1',
        widgetComponent: TestTextWidget,
        value: 'Some value',
        changeHandler: jest.genMockFunction(),
      },
      {
        name: 'widget2',
        widgetComponent: TestTextWidget,
        value: 'Some other value',
        changeHandler: jest.genMockFunction(),
      },
    ];

    const renderer = TestUtils.renderIntoDocument(
      <TestRenderer
        fields={ testFields }
      />
    );

    const renderedWidgets = TestUtils.scryRenderedComponentsWithType(
      renderer, TestTextWidget
    );
    const input1 = TestUtils.findRenderedDOMComponentWithTag(
      renderedWidgets[0], 'input'
    );
    const input2 = TestUtils.findRenderedDOMComponentWithTag(
      renderedWidgets[1], 'input'
    );

    expect(ReactDOM.findDOMNode(input1).value).toEqual('Some value');
    expect(ReactDOM.findDOMNode(input2).value).toEqual('Some other value');

    TestUtils.Simulate.change(input1, { target: { value: 'New value'} });
    expect(testFields[0].changeHandler.mock.calls.length).toBe(1);
    expect(testFields[0].changeHandler.mock.calls[0][0]).toEqual('New value');
  });
});
