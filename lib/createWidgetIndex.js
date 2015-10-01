export default function createWidgetIndex(widgets) {
  return Object.keys(widgets).reduce((index, widgetName) => {
    widgets[widgetName].supportedTypes.forEach((type) => {
      if (!index[type]) { index[type] = []; }
      index[type].push(widgetName);
    });
    return index;
  }, {});
}
