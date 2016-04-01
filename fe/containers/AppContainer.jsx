import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  openGroceryHelperAct,
  closeGroceryHelperAct
} from '../actions/AppAction';

class AppContainer extends React.Component {
  render() {
    const { routes, params } = this.props;

    return (
      <div id="app">
        <img src="/assets/wmtg_bg.png" className="bg" alt="" />
        <div id="gorcery-helper" onClick={ event => this.closeGroceryHelper(event) }>
          <div onClick={ event => this.preventCloseGroceryHelper(event) }>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)