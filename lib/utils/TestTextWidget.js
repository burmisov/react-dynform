import React, { Component, PropTypes } from 'react';

export default class TestTextWidget extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <input
        type="text"
        value={ this.props.value }
        onChange={ ::this.handleChange }
      />
    );
  }
}
