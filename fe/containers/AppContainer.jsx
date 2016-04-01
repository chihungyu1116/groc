import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';

class AppContainer extends React.Component {
  render() {
    const { routes, params } = this.props;

    return (
      <div id="app">
        <img src="/assets/wmtg_bg.png" id="bg" alt="" />
        <div id="public-page">{this.props.children}</div>
      </div>
    );
  }
}

AppContainer.contextTypes = {
  router: React.PropTypes.object.isRequired 
};

AppContainer.propTypes = {
  children: PropTypes.object
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AppContainer)