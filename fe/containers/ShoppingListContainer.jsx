import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  addToShoppingListAct,
  itemIsAlreadyInShoppingListAct
} from '../actions/ShoppingListAction';

const ENTER_KEY_CODE = 13;

class ShoppingListContainer extends React.Component {
  render() {
    const {
      list,
      message
    } = this.props;

    return (
      <div className='gorcery-helper'>
        <div>{ message }</div>
        <div>
          Item Name: <input onKeyDown={ event => { this.handleInput(event) } } />
        </div>
        <ul className='shopping-list'>
          {
            list.map((itemName, index) => {
              return <li key={ index }>{ itemName }</li>
            })
          }
        </ul>
        <button>Show List</button>
      </div>
    );
  }

  handleInput(event) {
    const { list } = this.props;
    const { keyCode, target } = event;
    const itemName = target.value.trim();

    if(keyCode === ENTER_KEY_CODE && itemName) {
      if(list.indexOf(itemName) === -1) {
        this.props.addToShoppingListAct(itemName);
        target.value = '';
      } else {
        this.props.itemIsAlreadyInShoppingListAct();
      }
    }
  }
}

ShoppingListContainer.contextTypes = {
  router: React.PropTypes.object.isRequired 
};

ShoppingListContainer.propTypes = {
  children: PropTypes.object
}

const mapStateToProps = (state) => {
  const { message, list } = state.ShoppingListReducer;

  return {
    message,
    list
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToShoppingListAct: (itemName) => {
      dispatch(addToShoppingListAct(itemName));
    },
    itemIsAlreadyInShoppingListAct: () => {
      dispatch(itemIsAlreadyInShoppingListAct());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListContainer)