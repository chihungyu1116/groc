import {
  ADD_TO_SHOPPING_LIST_ACT,
  ITEM_IS_ALREADY_IN_SHOPPING_LIST_ACT
} from '../actions/ShoppingListAction';

const defaultState = {
  list: []
}

const MESSAGE_DUPLICATE_ITEM = 'Item is already in the shopping list!';
const MESSAGE_NOTHING = '';

export default function ShoppingListReducer(state = defaultState, action) {
  if(action.type === ADD_TO_SHOPPING_LIST_ACT) {
    const { itemName } = action;
    const { list } = state;
    
    let newList = list.slice();
    newList.push(itemName);

    return Object.assign({}, state, {
      list: newList,
      message: MESSAGE_NOTHING
    });
  } else if(action.type === ITEM_IS_ALREADY_IN_SHOPPING_LIST_ACT) {
    return Object.assign({}, state, {
      message: MESSAGE_DUPLICATE_ITEM
    });
  }

  return state;
}