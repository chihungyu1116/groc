import React, { Component , PropTypes } from 'react'
import { connect } from 'react-redux'
import RadioGroup from 'react-radio-group'
import {
  openGroceryHelperAct,
  closeGroceryHelperAct
} from '../actions/AppAction';
import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider';

class OnboardingContainer extends React.Component {
  componentWillMount() {
    this.setInitialState()
    this.handleChange = this.handleChange.bind(this);
    this.handleKidChange = this.handleKidChange.bind(this);
  }
  setInitialState(){
    this.setState({
      householdSize:5,
      is_shop_for_kid: 'yes'
    })
  }
  handleKidChange(value){
    this.setState({is_shop_for_kid: value})
  }
  handleChange(e){
      this.setState({'householdSize': $(e.target).val()})
  }
  closeHelper(){
    this.props.closeGroceryHelperAct();
    window.location.hash = '';
  }
  render() {
    const { routes, params } = this.props;
    var divStyle = {
      display: 'none'
    };

    return (
      <div className='onboarding'>
        <div className="onboarding-container">
          <div className="onboarding-questionaire one" style={divStyle}>
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
              <div className="skip-section">
                <a href="#" onClick={this.closeHelper}>Come back later</a>
              </div>
            </div>
          </div>
          <div className="onboarding-questionaire two" style={divStyle}>
            <div className="question">What is your gender?</div>
            <div className="visual">
              <div className="male option">
                <div className="img">
                  <img src="/assets/male.png"/>
                </div>
                <div className="msg">Male</div>
              </div>
              <div className="female option">
                <div className="img">
                  <img src="/assets/female.png"/>
                </div>
                <div className="msg">Female</div>
              </div>
              <div className="skip-section">
                <a href="#" onClick={this.closeHelper}>Come back later</a>
              </div>
            </div>
          </div>
          <div className="onboarding-questionaire three" style={divStyle}>
            <div className="question">How many people are you shopping for?</div>
            <div className="range-slider">
              <input
                  type="range"
                  min="0"
                  max="10"
                  value={this.state.householdSize}
                  onChange={this.handleChange}
              />
              <div className="household-size-info">
                <span className="min">0</span>
                <span>{this.state.householdSize}</span>
                <span className="max">10</span>
              </div>
              <div className="question">Are you shopping for your kids as well?</div>
              <div className="kids-choices">
                <RadioGroup name="kid" selectedValue={this.state.is_shop_for_kid} onChange={this.handleKidChange}>
                  {Radio => (
                  <div>
                    <Radio value="yes" />Yes
                    <Radio value="no" />No
                  </div>
                      )}
                </RadioGroup>
              </div>
            </div>
            <div className="skip-section">
              <a href="#" onClick={this.closeHelper}>Come back later</a>
            </div>
          </div>
          <div className="onboarding-questionaire four">
            <div className="category question">Preferred categories <span className="hint"> (Pick up to three)</span></div>
            <div className="select-categories">
              <div className="row">
                <div className="option">
                  <img src="/assets/vegetables.png"/>
                  <div className="info">Vegetables</div>
                </div>
                <div className="option">
                  <img src="/assets/fruits.png"/>
                  <div className="info">Fruits</div>
                </div>
                <div className="option">
                  <img src="/assets/meat.png"/>
                  <div className="info">Meat</div>
                </div>
                <div className="option">
                  <img src="/assets/bakery.png"/>
                  <div className="info">Bakery</div>
                </div>
                <div className="option">
                  <img src="/assets/seafood.png"/>
                  <div className="info">Seafood</div>
                </div>
                <div className="option">
                  <img src="/assets/milk.png"/>
                  <div className="info">Milk & Cream</div>
                </div>
              </div>
              <div className="row">
                <div className="option">
                  <img src="/assets/beverage.png" className="beverage"/>
                  <div className="info">Beverage</div>
                </div>
                <div className="option">
                  <img src="/assets/snacks.png"/>
                  <div className="info">Snacks</div>
                </div>
                <div className="option">
                  <img src="/assets/kitchen.png"/>
                  <div className="info">Kitchen & Tools</div>
                </div>
                <div className="option">
                  <img src="/assets/toys.png"/>
                  <div className="info">Baby & Toys</div>
                </div>
                <div className="option">
                  <img src="/assets/electroincs.png"/>
                  <div className="info">Electronics</div>
                </div>
                <div className="option">
                  <img src="/assets/sports.png" className="sports"/>
                  <div className="info sports">Sports</div>
                </div>
              </div>
            </div>
            <div className="skip-section">
              <a href="#" onClick={this.closeHelper}>Come back later</a>
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
const mapDispatchToProps = (dispatch) => {
  return {
    openGroceryHelperAct : () => {
      dispatch(openGroceryHelperAct());
    },
    closeGroceryHelperAct : () => {
      dispatch(closeGroceryHelperAct());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OnboardingContainer)