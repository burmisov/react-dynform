import React, { Component, PropTypes } from 'react';

export default class DynForm extends Component {
  static propTypes = {
    schema: PropTypes.shape({
      fields: PropTypes.object.isRequired,
      layout: PropTypes.object,
    }).isRequired,
    model: PropTypes.object.isRequired,
    renderer: PropTypes.func.isRequired,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>TODO</span>
    );
  }
}
