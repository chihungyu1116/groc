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
      <div className='gorcery-helper jman'>
        <div className="option">
          <div className="question">Already have a shopping list?</div>
          <a href="#shopping-list">
            <div className="img">
              <img src="/assets/shoppinglist.png"/>
            </div>
            <div className="msg">Shop With Shopping list</div>
          </a>
        </div>
        <div className="option">
          <div className="question">No? Let us help you!</div>
          <a href="#onboarding">
            <div className="img">
              <img src="/assets/grocery.png"/>
            </div>
            <div className="msg">Shop With Our Guide</div>
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(GroceryHelperContainer)