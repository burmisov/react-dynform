import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';

export default class TextInputWidget extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <Input
        type="text"
        value={ this.props.value }
        label={ this.props.label }
        placeholder={ this.props.placeholder }
        onChange={ ::this.handleChange }
      />
    );
  }
}
