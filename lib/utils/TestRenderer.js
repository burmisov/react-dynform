import React, { Component, PropTypes } from 'react';

export default class TestRenderer extends Component {
  static propTypes = {
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        widgetComponent: PropTypes.func.isRequired,
        value: PropTypes.any.isRequired,
        changeHandler: PropTypes.func.isRequired,
      })
    ).isRequired,
    layout: PropTypes.shape({
      //
    }),
  }

  render() {
    const elements = this.props.fields.map((field) => React.createElement(
      field.widgetComponent,
      { value: field.value, onChange: field.changeHandler, key: field.name }
    ));

    return (
      <span>{ elements }</span>
    );
  }
}
