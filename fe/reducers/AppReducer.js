import {
  OPEN_GROCERY_HELPER_ACT,
  CLOSE_GROCERY_HELPER_ACT
} from '../actions/AppAction'

import {
  COMPLETED_PROCESSING_SHOPPING_LIST_ACT
} from '../actions/ShoppingListAction';


const defaultState = {
  groceryHelperOpen: window.location.hash.match(/^\w+/) ? false : true
}

export default function AppReducer(state = defaultState, action) {
  if(action.type === OPEN_GROCERY_HELPER_ACT) {
    return Object.assign({}, state, {
      groceryHelperOpen: true
    });
  } else if(action.type === CLOSE_GROCERY_HELPER_ACT) {
    return Object.assign({}, state, {
      groceryHelperOpen: false
    });
  } else if(action.type === COMPLETED_PROCESSING_SHOPPING_LIST_ACT) {
    window.location.hash = 'suggestion-list';
  }

  return state;
}