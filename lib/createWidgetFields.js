export default function createWidgetFields({
  fieldsSchema,
  model,
  widgets,
  widgetIndex,
  changeHandlerCreator,
}) {
  return Object.keys(fieldsSchema).map((fieldName) => {
    const fieldSchema = fieldsSchema[fieldName];
    const widgetName = widgetIndex[fieldSchema.type][0];
    if (!widgetName) { throw new Error('No widget for type: ' + fieldSchema.type); }
    const widget = widgets[widgetName];
    const changeHandler = changeHandlerCreator(fieldName);
    const field = {
      name: 'field-' + fieldName,
      widgetComponent: widget.component,
      changeHandler: changeHandler,
      schema: fieldSchema,
    };
    if (model[fieldName]) { field.value = model[fieldName]; }
    return field;
  });
}
