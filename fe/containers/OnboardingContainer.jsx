import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';
import RadioGroup from 'react-radio-group';
import PreferredCategoryComponent from "../components/PreferredCategoryComponent.jsx";
import {
  processOnboardingDataAct  
} from '../actions/OnboardingAction';
import {
    openGroceryHelperAct,
    closeGroceryHelperAct
} from '../actions/AppAction';

import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider';
import _ from 'lodash';
const FIX_WIDTH = 700;

class OnboardingContainer extends React.Component {
  componentWillMount() {
    this.setInitialState()
    this.handleChange = this.handleChange.bind(this)
    this.handleKidChange = this.handleKidChange.bind(this)
    this.closeHelper = this.closeHelper.bind(this)
    this.slideToNext = this.slideToNext.bind(this)
    this.slideToPrev = this.slideToPrev.bind(this)
    this.handleCategorySelect = this.handleCategorySelect.bind(this)
    this.select = this.select.bind(this)
    this.submit = this.submit.bind(this)
  }
  setInitialState(){
    this.setState({
      householdSize:5,
      is_shop_for_kid: 'yes',
      gender: "male",
      step: 0,
      categories: []
    })
  }
  handleKidChange(value){
    this.setState({is_shop_for_kid: value})
  }
  handleChange(e){
      this.setState({'householdSize': $(e.target).val()})
  }
  handleCategorySelect(isAdd, category){
    var categories = this.state.categories
    if(isAdd){
      categories.push(category)
    }else{
      _.remove(categories, item => {
        return item === category
      })
    }
    this.setState({categories: categories})
  }
  closeHelper(){
    this.props.closeGroceryHelperAct();
    window.location.hash = '';
  }
  submit(e){
    let data = {};
    data.num_household = this.state.householdSize;
    data.single = this.state.is_shop_for_self;
    data.gender = this.state.gender;
    data.has_kids = this.state.is_shop_for_kid == "yes";
    data.event = this.state.event;
    data.categories = this.state.categories.join(',');
    console.log('submit what? ',this,data);
    this.props.processOnboardingDataAct(data);
  }
  select(event){
    let data = {}
    let $currentTarget = $(event.currentTarget)
    let is_shop_for_self = $currentTarget.attr("data-is-shop-for-self")
    let is_male = $currentTarget.attr("data-is-male")
    let special_event = $currentTarget.attr("data-special-event")
    if(is_shop_for_self){
      data.is_shop_for_self = is_shop_for_self === 'true' ? true : false
    }
    if(data.is_shop_for_self){
      $(this.refs.family_question).hide()
      $(this.refs.gender_question).show()
    }else{
      $(this.refs.gender_question).hide()
      $(this.refs.family_question).show()
    }
    if(special_event){
      $currentTarget.addClass('selected')
      data.event = special_event
    }
    if(is_male){
      data.gender = is_male === 'true' ? "male" : "female"
    }
    this.setState(data)
    this.slideToNext();
  }
  slideToNext(){
     let $container = $(this.refs.container);
     let step = this.state.step + 1;
     if(step < 4){
       $container.animate({
         left: "-" + step * FIX_WIDTH + "px"
       }, 300)
       this.setState({step: step})
     }
  }
  slideToPrev(){
    let $container = $(this.refs.container);
    let step = this.state.step - 1;
    $container.animate({
      left: "-" + step * FIX_WIDTH + "px"
    }, 300)
    this.setState({step: step })
  }
  render() {
    return (
      <div className='onboarding'>
        <div className="onboarding-container" ref="container">
          <div className="onboarding-questionaire one">
            <div className="question">What best describe your shopping now?</div>
            <div className="visual">
              <div className="self option" onClick={event => this.select(event)} data-is-shop-for-self={true}>
                <div className="img">
                  <img src="/assets/self-image.png" className="self-image"/>
                </div>
                <div className="msg">Shop for self</div>
              </div>
              <div className="family option" onClick={event => this.select(event)} data-is-shop-for-self={false}>
                <div className="img">
                  <img src="/assets/family-image.png" className="family-image"/>
                </div>
                <div className="msg">Shop for family</div>
              </div>
              <div className="progress-section">Steps 1 / 4</div>
              <div className="skip-section">
                <a href="#" onClick={this.closeHelper}>Come back later</a>
              </div>
            </div>
          </div>
          <div className="onboarding-questionaire two" ref="gender_question">
            <div className="question">What is your gender?</div>
            <div className="control">
              <i className="fa fa-angle-left fa-2x" onClick={this.slideToPrev}/>
              <i className="fa fa-angle-right fa-2x" onClick={this.slideToNext}/>
            </div>
            <div className="visual">
              <div className="male option" onClick={event => this.select(event)} data-is-male={true}>
                <div className="img">
                  <img src="/assets/male.png"/>
                </div>
                <div className="msg">Male</div>
              </div>
              <div className="female option" onClick={event => this.select(event)} data-is-male={false}>
                <div className="img">
                  <img src="/assets/female.png"/>
                </div>
                <div className="msg">Female</div>
              </div>
              <div className="progress-section">Steps 2 / 4</div>
              <div className="skip-section">
                <a href="#" onClick={this.closeHelper}>Come back later</a>
              </div>
            </div>
          </div>
          <div className="onboarding-questionaire three" ref="family_question">
            <div className="question">How many people are you shopping for?</div>
            <div className="control">
              <i className="fa fa-angle-left fa-2x" onClick={this.slideToPrev}/>
              <i className="fa fa-angle-right fa-2x" onClick={this.slideToNext}/>
            </div>
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
            <div className="progress-section">Steps 2 / 4</div>
            <div className="skip-section">
              <a href="#" onClick={this.closeHelper}>Come back later</a>
            </div>
          </div>
          <div className="onboarding-questionaire four">
            <div className="category question">Preferred categories <span className="hint"> (Pick up to three)</span></div>
            <div className="control">
              <i className="fa fa-angle-left fa-2x" onClick={this.slideToPrev}/>
              <i className="fa fa-angle-right fa-2x" onClick={this.slideToNext}/>
            </div>
            <PreferredCategoryComponent handleCategorySelect={this.handleCategorySelect}/>
            <div className="progress-section">Steps 3 / 4</div>
            <div className="skip-section">
              <a href="#" onClick={this.closeHelper}>Come back later</a>
            </div>
          </div>
          <div className="onboarding-questionaire five">
            <div className="question">Are you shopping for any events?</div>
            <div className="control">
              <i className="fa fa-angle-left fa-2x" onClick={this.slideToPrev}/>
            </div>
            <div className="visual event-shopping">
              <div className="option" onClick={event => this.select(event)} data-special-event="birthday">
                <div className="img">
                  <img src="/assets/birthday-cake.png"/>
                </div>
                <div className="msg">Birthday Party</div>
              </div>
              <div className="option" onClick={event => this.select(event)} data-special-event="baby-shower">
                <div className="img">
                  <img src="/assets/baby.png"/>
                </div>
                <div className="msg">Baby Shower</div>
              </div>
            </div>
            <div className="progress-section">Steps 4 / 4</div>
            <div className="submit">
              <button onClick={this.submit}>Check out the list!</button>
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
    processOnboardingDataAct : (data) => {
      dispatch(processOnboardingDataAct(data));
    },
    closeGroceryHelperAct : () => {
      dispatch(closeGroceryHelperAct());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OnboardingContainer)