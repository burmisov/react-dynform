/* global jest, describe, it, expect */

jest.dontMock('../createWidgetFields');
jest.dontMock('../createWidgetIndex');

describe('createWidgetFields', () => {
  it('performs a correct transform', () => {
    const createWidgetFields = require('../createWidgetFields');
    const createWidgetIndex = require('../createWidgetIndex');

    const testWidgetSet = {
      text: {
        component: () => {},
        supportedTypes: ['text'],
      },
    };

    const testSchema = {
      fields: {
        testField1: {
          type: 'text',
        },
      },
      layout: {},
    };

    const model = {
      testField1: 'Some name',
    };

    const handlerList = [];
    function changeHandlerCreator(fieldName) {
      const handlerMock = jest.genMockFunction();
      handlerList.push(handlerMock);
      return function handler(newValue) {
        handlerMock(fieldName, newValue);
      };
    }

    const widgetIndex = createWidgetIndex(testWidgetSet);

    const widgetFields = createWidgetFields({
      fieldsSchema: testSchema.fields,
      model: model,
      widgets: testWidgetSet,
      widgetIndex: widgetIndex,
      changeHandlerCreator: changeHandlerCreator,
    });

    expect(widgetFields.length).toBe(1);
    expect(Object.keys(widgetFields[0]).length).toBe(5);
    expect(widgetFields[0].name).toBe('field-testField1');
    expect(widgetFields[0].widgetComponent).toBe(testWidgetSet.text.component);
    expect(typeof widgetFields[0].changeHandler).toBe('function');
    expect(handlerList.length).toBe(1);
    widgetFields[0].changeHandler('new value');
    expect(handlerList[0].mock.calls.length).toBe(1);
    expect(handlerList[0].mock.calls[0]).toEqual(['testField1', 'new value']);
  });
});
