import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  openGroceryHelperAct,
  closeGroceryHelperAct
} from '../actions/AppAction';

class AppContainer extends React.Component {
  render() {
    const { groceryHelperOpen } = this.props;
    const groceryHelperClass = 'popup ' + (groceryHelperOpen ? 'open' : 'close');
    return (
      <div id="app">
        <img src="/assets/wmtg_bg1.png" className="bg" alt="" />
        <div id="gorcery-helper" onClick={ event => this.closeGroceryHelper(event) } className={ groceryHelperClass }>
          <div onClick={ event => this.preventCloseGroceryHelper(event) } className={ groceryHelperClass }>
            {this.props.children}
          </div>
        </div>
        <div id="icon" onClick={ event => this.openGroceryHelper(event) } ></div>
      </div>
    );
  }

  openGroceryHelper(event) {
    this.props.openGroceryHelperAct();
    window.location.hash = 'grocery-helper';

  }

  closeGroceryHelper(event) {
    this.props.closeGroceryHelperAct();
    window.location.hash = '';
  }

  preventCloseGroceryHelper(event) {
    event.stopPropagation();
  }
}

AppContainer.contextTypes = {
  router: React.PropTypes.object.isRequired 
};

AppContainer.propTypes = {
  children: PropTypes.object
}

function mapStateToProps(state) {
  const { groceryHelperOpen } = state.AppReducer;

  console.log(state.SuggestionListReducer)

  return {
    groceryHelperOpen
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)