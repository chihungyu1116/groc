import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';

class GroceryHelperContainer extends React.Component {
  static contextTypes() {
    router: React.PropTypes.object.isRequired 
  }

  static propTypes() {
    children: PropTypes.object
  }

  render() {
    const { routes, params } = this.props;

    return (
      <div id="grocery-helper">
        <a href="#grocery-helper">Grocery Helper</a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(GroceryHelperContainer)