/* global jest, describe, it, expect */

jest.dontMock('../DynForm');
jest.dontMock('../utils/TestRenderer');
jest.dontMock('../utils/TestTextWidget');

describe('DynForm', () => {
  it('contains what is expected', () => {
    const React = require('react');
    const TestUtils = require('react-addons-test-utils');

    const DynForm = require('../DynForm');
    const TestRenderer = require('../utils/TestRenderer');
    const TestTextWidget = require('../utils/TestTextWidget');

    const testWidgetSet = {
      text: {
        component: TestTextWidget,
        supportedTypes: ['text'],
      },
    };

    const testSchema = {
      fields: {
        testField1: {
          type: 'text',
        },
      },
    };

    const model = {
      testField1: 'Some value',
    };

    const changeHandler = jest.genMockFunction();

    const dynForm = TestUtils.renderIntoDocument(
      <DynForm
        schema={ testSchema }
        model={ model }
        renderer={ TestRenderer }
        widgets={ testWidgetSet }
        onChange={ changeHandler }
      />
    );

    const inputs = TestUtils.scryRenderedDOMComponentsWithTag(dynForm, 'input');
    expect(inputs.length).toBe(1);

    const input = inputs[0];
    expect(React.findDOMNode(input).value).toBe('Some value');

    TestUtils.Simulate.change(input, { target: { value: 'New value' } });
    expect(changeHandler.mock.calls.length).toBe(1);
    expect(changeHandler.mock.calls[0].length).toBe(1);
    expect(changeHandler.mock.calls[0][0]).toEqual({ testField1: 'New value' });
  });
});
