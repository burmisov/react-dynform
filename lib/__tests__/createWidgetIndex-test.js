/* global jest, describe, it, expect */

jest.dontMock('../createWidgetIndex');

describe('createWidgetIndex', () => {
  it.only('creates a correct index', () => {
    const createWidgetIndex = require('../createWidgetIndex');

    const testWidgetSet = {
      text: {
        component: () => {},
        supportedTypes: ['text'],
      },
      textArea: {
        component: () => {},
        supportedTypes: ['text', 'string'],
      },
      stringArea: {
        component: () => {},
        supportedTypes: ['string'],
      },
    };

    const testWidgetIndex = createWidgetIndex(testWidgetSet);

    expect(Object.keys(testWidgetIndex).length).toBe(2);

    expect(testWidgetIndex.text).toBeDefined();
    expect(testWidgetIndex.text.length).toBe(2);
    expect(testWidgetIndex.text[0]).toEqual('text');
    expect(testWidgetIndex.text[1]).toEqual('textArea');

    expect(testWidgetIndex.string).toBeDefined();
    expect(testWidgetIndex.string.length).toBe(2);
    expect(testWidgetIndex.string[0]).toEqual('textArea');
    expect(testWidgetIndex.string[1]).toEqual('stringArea');
  });
});
