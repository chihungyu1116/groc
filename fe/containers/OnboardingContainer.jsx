import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  openGroceryHelperAct,
  closeGroceryHelperAct
} from '../actions/AppAction';

class OnboardingContainer extends React.Component {
  render() {
    const { routes, params } = this.props;

    return (
      <div className='gorcery-helper'>
        <div>fooddo</div>
      </div>
    );
  }
}

OnboardingContainer.contextTypes = {
  router: React.PropTypes.object.isRequired 
};

OnboardingContainer.propTypes = {
  children: PropTypes.object
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(OnboardingContainer)