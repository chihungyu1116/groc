import React, { Component , PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  addToShoppingListAct,
  removeFromShoppingListAct,
  itemIsAlreadyInShoppingListAct,
  processShoppingListAct,
  shoppingListIsEmptyAct
} from '../actions/ShoppingListAction';

const ENTER_KEY_CODE = 13;

class ShoppingListContainer extends React.Component {
  render() {
    const {
      list,
      message
    } = this.props;

    return (
      <div className='gorcery-helper jy'>
        <div className='shopping-list-view'>
          <div>{ message }</div>
          <div>
            Item Name: <input onKeyDown={ event => { this.addToShoppingList(event) } } />
          </div>
          <ul className='shopping-list'>
            {
              list.map((itemName, index) => {
                return <li key={ index }>{ itemName } <i className="fa fa-times" onClick={ event => { this.removeFromShoppingList(event, index)} }></i> </li>
              })
            }
          </ul>
          <button className='btn' onClick={ event => this.processShoppingList() } >Show List</button>
        </div>
      </div>
    );
  }

  processShoppingList(event) {
    const { list } = this.props;

    if(list.length !== 0) {
      this.props.processShoppingListAct(list);
    } else {
      this.props.shoppingListIsEmptyAct();
    }
  }

  removeFromShoppingList(event, index) {
    this.props.removeFromShoppingListAct(index);
  }

  addToShoppingList(event) {
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
    removeFromShoppingListAct: (index) => {
      dispatch(removeFromShoppingListAct(index));
    },
    itemIsAlreadyInShoppingListAct: () => {
      dispatch(itemIsAlreadyInShoppingListAct());
    },
    processShoppingListAct: (list) => {
      dispatch(processShoppingListAct(list));
    },
    shoppingListIsEmptyAct: () => {
      dispatch(shoppingListIsEmptyAct());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListContainer)