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
      <div className='onboarding'>
        <div className="onboarding-questionaire">
          <div className="question">What best describe your shopping now?</div>
          <div className="visual">
            <div className="self option">
              <div className="img">
                <img src="/assets/self-image.png" className="self-image"/>
              </div>
              <div className="msg">Shop for self</div>
            </div>
            <div className="family option">
              <div className="img">
                <img src="/assets/family-image.png" className="family-image"/>
              </div>
              <div className="msg">Shop for family</div>
            </div>
          </div>
        </div>
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