import React, { Component, PropTypes } from 'react';
import createWidgetIndex from './createWidgetIndex';
import createWidgetFields from './createWidgetFields';

export default class DynForm extends Component {
  static propTypes = {
    schema: PropTypes.shape({
      fields: PropTypes.object.isRequired,
      layout: PropTypes.object,
    }).isRequired,
    model: PropTypes.object.isRequired,
    renderer: PropTypes.func.isRequired,
    widgets: PropTypes.objectOf(PropTypes.shape({
      component: PropTypes.func.isRequired,
      supportedTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    })).isRequired,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      widgetIndex: createWidgetIndex(props.widgets),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.widgets !== this.props.widgets) {
      this.setState({
        widgetIndex: createWidgetIndex(nextProps.widgets),
      });
    }
  }

  handleFieldChange(fieldName, newValue) {
    const newModel = {
      ...this.props.model,
      [fieldName]: newValue,
    };
    if (this.props.onChange) {
      this.props.onChange(newModel);
    }
  }

  createFieldChangeHandler(fieldName) {
    return function handler(newValue) {
      this.handleFieldChange(fieldName, newValue);
    }.bind(this);
  }

  render() {
    const fields = createWidgetFields({
      fieldsSchema: this.props.schema.fields,
      model: this.props.model,
      widgets: this.props.widgets,
      widgetIndex: this.state.widgetIndex,
      changeHandlerCreator: ::this.createFieldChangeHandler,
    });

    const Renderer = this.props.renderer;

    return (
      <Renderer
        fields={ fields }
        layout={ this.props.schema.layout }
      />
    );
  }
}
