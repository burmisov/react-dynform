import React, { Component, PropTypes } from 'react';

export default class BootstrapRenderer extends Component {
  static propTypes = {
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        widgetComponent: PropTypes.func.isRequired,
        value: PropTypes.any,
        changeHandler: PropTypes.func.isRequired,
        schema: PropTypes.shape({
          label: PropTypes.string,
          placeholder: PropTypes.string,
        }),
      })
    ).isRequired,
    layout: PropTypes.shape({
      //
    }),
  }

  render() {
    const elements = this.props.fields.map((field) => React.createElement(
      field.widgetComponent,
      {
        value: field.value,
        onChange: field.changeHandler,
        key: field.name,
        label: field.schema.label,
        placeholder: field.schema.placeholder,
      }
    ));

    return (
      <span>{ elements }</span>
    );
  }
}
